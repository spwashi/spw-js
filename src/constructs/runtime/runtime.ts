import {SpwNode} from '../item/impl/nodes/abstract/node';
import {SpwDocument, SpwDocumentIdentifier, SpwDocumentRegistry} from './spwDocument';
import {RuntimeRegister} from './register';
import {hydrate} from '../item/util/hydrate';
import {UnhydratedSpwItem} from '../item/impl/nodes/abstract/interfaces/node';
import {SpwItem, SpwItemKey} from '../item/abstract/item';

export type Parser =
    {
        parse: (input: string) => UnhydratedSpwItem,
        SyntaxError: Error
    };

type SyntaxTreeOption = SpwItem | SpwItem[] | Error;

type RegisterMap =
    {
        all: RuntimeRegister;
        lastAcknowledged: RuntimeRegister;
        keys: {
            [key: string]: RuntimeRegister;
        }
    };

/**
 * I need to read more about what this is supposed to do.
 *
 * Originally I just wanted a place to keep the "meaning" of
 *
 */
export class Runtime {
    _rawNodeMap                                                                = new Map<UnhydratedSpwItem, SpwItem>()
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
        new Map<SpwDocumentIdentifier, SyntaxTreeOption>();
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
    private _registers                                                         =
                {
                    all:              new RuntimeRegister(),
                    lastAcknowledged: new RuntimeRegister({memory: 1}),
                    keys:             {},
                };
    /**
     *
     * @param parser
     */
    constructor(parser: Parser) {
        if (typeof parser.parse !== 'function') {
            throw new Error('Invalid parser');
        }
        this.parser = parser;
    }
    /**
     *
     */
    get registers(): RegisterMap {
        return this._registers;
    }
    /**
     * Mark a modules as Active
     * @param key
     */
    async loadDocument(key: SpwDocumentIdentifier | SpwDocument): Promise<SpwItem | SpwItem[] | null> {
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
                return <SpwItem>this.syntaxTrees.get(id);
            }
            throw new Error('Module is already loaded, though ')
        }

        // parse the document
        const parsed = this.parse(document.src);
        try {
            const hydrated = await hydrate(parsed,
                                           {
                                               absorb:   this.incorporateNode.bind(this),
                                               location: {moduleID: document.identifier},
                                           });
            this.loadedDocuments.add(document);
            this.syntaxTrees.set(id, hydrated);
            return hydrated;
        } catch (e) {
            // console.log(util.inspect(parsed, {depth: null, colors: true}));
            throw e;
        }
    }
    /**
     * Register a module in this runtime
     * @param id
     */
    async registerDocument(id: SpwDocument) {
        this.moduleRegistry.register(id);
    }

    locateNode(search: Exclude<SpwItemKey, null> | UnhydratedSpwItem): SpwItem[] {
        if (!search) return [];

        if (typeof search === 'string') {
            return this.registers.keys[search]?.flat ?? [];
        }

        if (search.key) {
            return this.registers.keys[search.key]?.flat ?? (
                [this._rawNodeMap.get(search)].filter(Boolean)
            );
        }

        return [];
    }

    /**
     * Add a node to the runtime
     * @param node
     */
    private incorporateNode(node: SpwNode): SpwNode {
        this._rawNodeMap.set(node.raw, node);
        this.registers.all.add(node);
        this.registers.lastAcknowledged.add(node);
        if (node.key) {
            (this.registers.keys[node.key] = this.registers.keys[node.key] ?? new RuntimeRegister()).add(node)
        }

        return node;
    }
    /**
     *
     * @param src
     * @private
     */
    private parse(src: string | null) {
        try {
            return src ? this.parser.parse(src) : null;
        } catch (e) {
            debugger;
            throw e;
        }
    }
}