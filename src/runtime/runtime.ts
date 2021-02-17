import {SpwNode, SpwNodeKeyValue} from '../ast/node/spwNode';
import {SpwDocument, SpwDocumentRegistry, SpwModuleIdentifier} from './spwDocument';
import {RegisterMap, RuntimeRegister} from './register';
import {incorporateNode} from '../ast/incorporateNode';
import {SpwAnchorNode} from '../ast/node/nodeTypes/anchorNode';
import {SpwStringNode} from '../ast/node/nodeTypes/stringNode';
import {SpwNodeLocation, UnhydratedSpwNode} from '../ast/types';
import {SpwPerformanceNode} from '../ast/node/nodeTypes/performanceNode';


export type Parser = {
    parse: (input: string) => UnhydratedSpwNode,
    SyntaxError: Error
};

export type SpwNodeIdentifier = string | Symbol;

export interface SpwRuntime {
    absorb(node: SpwNode): any;

    locate(id: SpwNodeIdentifier): Promise<any>
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

/**
 * I need to read more about what this is supposed to do.
 *
 * Originally I just wanted a place to keep the "meaning" of
 *
 */
export class Runtime implements SpwRuntime {
    static symbols = {keyed, lastAcknowledged, all, performance, evaluation};

    public DEBUG_MODE = 0;

    /**
     * The parser used to generate the un-hydrated AST
     * @private
     */
    private readonly parser: Parser;

    /**
     *
     * @private
     */
    private readonly syntaxTrees: Map<SpwModuleIdentifier, SyntaxTreeOption> =
        new Map<SpwModuleIdentifier, SyntaxTreeOption>()

    /**
     * Modules that have been loaded into this runtime
     * @private
     */
    private readonly moduleRegistry: SpwDocumentRegistry = new SpwDocumentRegistry();

    /**
     * Set of modules that are in the ModuleRegistry
     * @private
     */
    private readonly loadedModules = new Set<SpwDocument>();

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

    private _registers: RegisterMap = new Map();

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
        return typeof node === 'string' || typeof node === 'symbol'
               ? node
               : lastAcknowledged;
    }

    /**
     * Add a node to the runtime
     * @param node
     */
    absorb(node: SpwNode): SpwNode {
        if (hasStaticAnchor(node)) {
            this.registerItem(keyed, node)
        }

        if (node instanceof SpwPerformanceNode) {
            this.registerItem(performance, node)
        }

        this.registerItem(all, node);

        const id = this.identify(node)
        this.registerItem(id, node)

        return node;
    }

    /**
     * Returns a generator that lists occurrences of an identifier
     * @param node
     */
    async locate(node: SpwNodeIdentifier): Promise<Generator> {
        const id                 = this.identify(node);
        let items: Iterable<any> = [];

        if (this._registers.has(id)) {
            const register = this._registers.get(id);
            items          = register?.items || [];
        } else if (typeof id === 'string') {
            const anchors = this._registers.get(keyed);
            items         = anchors?.get(`+${id}`) as [] || [];
        }

        return (function* () {
            for (const item of items) {
                yield item?.item;
            }
        })()
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
                    return await this.module__load(value);
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
    async module__load(key: SpwModuleIdentifier | SpwDocument): Promise<SpwNodeKeyValue | Error> {
        this.DEBUG_MODE && console.log('loading module')
        const id = key instanceof SpwDocument
                   ? key.identifier
                   : key;
        if (!this.moduleRegistry.modules.has(id)) throw new Error('Module has not been registered');

        const spwModule = this.moduleRegistry.modules.get(id) as SpwDocument;
        const src       = spwModule.src;

        this.DEBUG_MODE && console.log('parsing module')

        let parsed: any;
        try {
            parsed = src ? this.parser.parse(src) : null;
        } catch (e) {
            throw new ParsingError(e)
        }
        this.DEBUG_MODE && console.log('module parsed')

        this.loadedModules.add(spwModule);

        let hydrated: string | number | SpwNode | SpwNodeKeyValue[] | Error;
        if (parsed) {
            hydrated =
                await incorporateNode(parsed,
                                      {
                                      absorb:   this.absorb.bind(this),
                                      location: {moduleID: spwModule.identifier},
                                  });
        } else {
            throw new Error('Could not parse');
        }

        this.syntaxTrees.set(id, hydrated as SpwNode | SpwNode[])

        return hydrated;
    }

    /**
     * Register a module in this runtime
     * @param id
     */
    async module__register(id: SpwDocument | SpwModuleIdentifier) {
        const m: SpwDocument =
                  !(id instanceof SpwDocument) ? await this.module__locate(id)
                                               : id;
        this.moduleRegistry.register(m);
    }

    /**
     * Get a module by its ID
     * @param id
     */
    async module__locate(id: SpwModuleIdentifier): Promise<SpwDocument> {
        if (!this.moduleRegistry.modules.has(id))
            throw new Error('Not sure how to find modules');

        return this.moduleRegistry.modules.get(id) as SpwDocument;
    }

    private registerItem(id: SpwNodeIdentifier, node: SpwNode) {
        const register = this._registers.get(id) || new RuntimeRegister();
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