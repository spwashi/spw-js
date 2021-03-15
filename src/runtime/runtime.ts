import {SpwNode, SpwNodeKeyValue} from '../ast/node/spwNode';
import {SpwDocument, SpwDocumentIdentifier, SpwDocumentRegistry} from './spwDocument';
import {RegisterMap, RegisterValue, RuntimeRegister} from './register';
import {incorporateNode} from '../ast/incorporateNode';
import {SpwAnchorNode} from '../ast/node/nodeTypes/anchorNode';
import {SpwStringNode} from '../ast/node/nodeTypes/stringNode';
import {SpwNodeLocation, UnhydratedSpwNode} from '../ast/types';
import {SpwPerformanceNode} from '../ast/node/nodeTypes/performanceNode';
import {stringifyLocation} from '../ast/node/util/location';


export type Parser = {
    parse: (input: string) => UnhydratedSpwNode,
    SyntaxError: Error
};

export type SpwNodeIdentifier = string | Symbol;

export interface SpwRuntime {
    incorporateNode(node: SpwNode): any;

    locateNode(node?: SpwNodeIdentifier): any;
}

const all: SpwNodeIdentifier              = Symbol('All');
const lastAcknowledged: SpwNodeIdentifier = Symbol('Last Acknowledged');
const keyed: SpwNodeIdentifier            = Symbol('Anchors');
const performance: SpwNodeIdentifier      = Symbol('Performance');
const evaluation: SpwNodeIdentifier       = Symbol('Evaluation');

function hasStaticAnchor(node: SpwNode | { key: string }) {
    if (node instanceof SpwAnchorNode || node instanceof SpwStringNode) return true;

    return !!(node as { key: string }).key;
}

class ParsingError implements Error {
    message: string;
    name: string;
    location: SpwNodeLocation;

    constructor(e: any) {
        this.message  = e.message;
        this.name     = e.name;
        this.location = e.location
    }
}

type SyntaxTreeOption = SpwNode | SpwNode[] | Error;

class IdentityManager {
    getNodeIdentifier(node: SpwNode | string | symbol | SpwNodeIdentifier | null): SpwNodeIdentifier {
        return typeof node === 'string' || typeof node === 'symbol'
               ? node
               : lastAcknowledged
    }
}

/**
 * I need to read more about what this is supposed to do.
 *
 * Originally I just wanted a place to keep the "meaning" of
 *
 */
export class Runtime implements SpwRuntime {
    static symbols = {keyed, lastAcknowledged, all, performance, evaluation};

    public DEBUG_MODE                                                          = 0;
    _nodes                                                                     = new Set;
    _identifier                                                                = new IdentityManager();
    /**
     * The parser used to generate the un-hydrated AST
     * @private
     */
    private readonly parser: Parser;
    /**
     *
     * @private
     */
    private readonly syntaxTrees: Map<SpwDocumentIdentifier, SyntaxTreeOption> =
        new Map<SpwDocumentIdentifier, SyntaxTreeOption>()
    /**
     * Modules that have been loaded into this runtime
     * @private
     */
    private readonly moduleRegistry: SpwDocumentRegistry                       = new SpwDocumentRegistry();
    /**
     * Set of modules that are in the ModuleRegistry
     * @private
     */
    private readonly loadedDocuments                                           = new Set<SpwDocument>();
    private _registers: RegisterMap                                            = new Map();
    /**
     *
     * @param parser
     */
    constructor(parser: Parser) {
        if (typeof parser.parse !== 'function') {
            throw new Error('Invalid parser');
        }
        this.parser = parser;
        this.initializeRegisters();
    }
    /**
     *
     */
    get registers(): RegisterMap {
        return this._registers;
    }
    /**
     * Given a node, return a symbol that can be used to reference it
     * @param node
     */
    identify(node: SpwNode | string | symbol | SpwNodeIdentifier | null): SpwNodeIdentifier {
        return this._identifier.getNodeIdentifier(node);
    }

    /**
     * Add a node to the runtime
     * @param node
     */
    incorporateNode(node: SpwNode): SpwNode {
        const location = stringifyLocation(node.location);
        if (this._nodes.has(location)) return node;

        if (hasStaticAnchor(node)) {
            this._addNodeToRegister(keyed, node)
        }

        if (node instanceof SpwPerformanceNode) {
            this._addNodeToRegister(performance, node)
        }

        this._addNodeToRegister(all, node);

        const id = this._identifier.getNodeIdentifier(node);
        this._addNodeToRegister(id, node)

        this._nodes.add(location)

        return node;
    }

    /**
     * Returns a generator that lists occurrences of an identifier
     * @param node
     */
    locateNode(node?: SpwNodeIdentifier): AsyncGenerator<SpwNode> {
        const runtime = this;
        const id      = runtime._identifier.getNodeIdentifier(node ?? null);

        return (
            async function* (): AsyncGenerator<SpwNode> {
                let regItemList: Array<RegisterValue>            = [];
                const conditions: ((curr: SpwNode) => boolean)[] = [];

                if (!node) {
                    regItemList = runtime.registers.get(Runtime.symbols.all)?.items ?? [];
                } else if (runtime._registers.has(id)) {
                    const register = runtime._registers.get(id);
                    regItemList    = register?.items || [];
                } else if (node === '&') {
                    regItemList = runtime.registers.get(Runtime.symbols.all)?.items ?? [];
                    conditions.push(node => node.kind === 'anchor');
                } else if (typeof id === 'string') {
                    const anchors = runtime._registers.get(keyed);
                    regItemList   = anchors?.get(id) as [] || [];

                }

                for (const regItem of regItemList) {
                    const testNode = regItem.item;
                    if (conditions.reduce((prev, nodeIsValid) => prev && (nodeIsValid(testNode) ?? true), true))
                        yield testNode;
                }
            }
        )()
    }

    /**
     * Reinitialize the registers, reload the modules
     * @param which
     */
    async refreshModules(which: true) {
        this.initializeRegisters();
        const loadModules = [...this.moduleRegistry.modules.values()]
            .map(async value => {
                try {
                    return await this.loadDocument(value);
                } catch (e) {
                    return e;
                }
            })
        await Promise.all(loadModules);
    }

    /**
     * Mark a modules as Active
     * @param key
     */
    async loadDocument(key: SpwDocumentIdentifier | SpwDocument): Promise<SpwNodeKeyValue | Error> {
        const id = key instanceof SpwDocument ? key.identifier : key;
        if (!this.moduleRegistry.modules.has(id)) {
            throw new Error('Module has not been registered');
        }

        // find the module
        const document = <SpwDocument>this.moduleRegistry.modules.get(id);

        // return preloaded document
        const wasLoaded = this.loadedDocuments.has(document);
        if (wasLoaded) {
            if (this.syntaxTrees.has(id)) {
                return <SyntaxTreeOption>this.syntaxTrees.get(id);
            }
            throw new Error('Module is already loaded, though ')
        }

        // parse the document
        const parsed   = this.parse(document.src);
        const hydrated = await incorporateNode(parsed,
                                               {
                                                   absorb:   this.incorporateNode.bind(this),
                                                   location: {moduleID: document.identifier},
                                               });
        this.loadedDocuments.add(document);
        this.syntaxTrees.set(id, hydrated);
        return hydrated;
    }

    /**
     * Register a module in this runtime
     * @param id
     */
    async registerDocument(id: SpwDocument) {
        this.moduleRegistry.register(id);
    }

    /**
     *
     * @param src
     * @private
     */
    private parse(src: string | null) {
        let parsed: any;
        try {
            return src ? this.parser.parse(src) : null;
        } catch (e) {
            throw new ParsingError(e)
        }
    }

    private _addNodeToRegister(id: SpwNodeIdentifier, node: SpwNode) {
        const register = this._registers.get(id) ?? new RuntimeRegister();
        register.add(node)
        this._registers.set(id, register);
    }

    private initializeRegisters() {
        this._registers = new Map<SpwNodeIdentifier, RuntimeRegister>();
        this._registers.set(all, new RuntimeRegister());
        this._registers.set(performance, new RuntimeRegister());
        this._registers.set(keyed, new RuntimeRegister({index: (node: SpwAnchorNode | any) => `+${node.key}`}));
        this._registers.set(lastAcknowledged, new RuntimeRegister({memory: 1}))
    }
}