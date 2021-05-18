import {SpwNode} from '../ast/nodes/_abstract/node';
import {SpwDocument, SpwDocumentID, SpwDocumentRegistry} from './spwDocument';
import {RuntimeRegister} from './register';
import {hydrate} from '../ast/_util/hydrate';
import {RawSpwItem} from '../ast/_abstract/interfaces/internal';
import {SpwItem} from '../ast/_abstract/item';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwItemKey} from '@constructs/ast/_abstract/types';

export type Parser =
    {
        parse: (input: string) => RawSpwItem,
        SyntaxError: Error
    };

type TopLevelNode =
    SpwItem
    | SpwItem[];
type RuntimeRegisters =
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
    _rawNodeMap = new Map<RawSpwItem, SpwItem>();

    private readonly parser: Parser;

    private readonly trees           = new Map<SpwDocumentID, TopLevelNode>();

    private readonly documents       = new SpwDocumentRegistry();

    /**
     * Set of modules that are in the ModuleRegistry
     * @private
     */
    private readonly loadedDocuments = new Set<SpwDocument>();

    private _registers               =
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

    get registers(): RuntimeRegisters {
        return this._registers;
    }

    /**
     * Mark a modules as Active
     * @param key
     */
    loadDocument(key: SpwDocumentID | SpwDocument): SpwItem | SpwItem[] | null {
        const id = `${key instanceof SpwDocument ? key.identifier : key}`

        // register documents
        if (key instanceof SpwDocument) {
            this.registerDocument(key);
            return this.loadDocument(id);
        }

        if (!this.documents.documents.has(id)) {
            throw new Error('Module has not been registered');
        }

        // find the module
        const document = <SpwDocument>this.documents.documents.get(id);
        if (this.loadedDocuments.has(document)) {
            if (this.trees.has(id)) return <SpwItem>this.trees.get(id);
            throw new Error('Could not load syntax tree')
        }

        // parse the document
        const parsed = this.parse(document.src);
        if (!parsed) return null;
        const hydrated = this.hydrateNode(parsed, document);
        if (!hydrated) return null;
        this.loadedDocuments.add(document);
        this.trees.set(id, hydrated as SpwItem | SpwItem[]);
        return hydrated as SpwItem | SpwItem[];
    }

    registerDocument(id: SpwDocument): void {
        this.documents.add(id);
    }

    locateNode(search: Exclude<SpwItemKey, null> | RawSpwItem | unknown): SpwItem[] {
        if (!search) return [];

        if (typeof search === 'string') {
            return this.registers.keys[search]?.flat ?? [];
        }

        const spwItem = search as RawSpwItem;
        if (typeof spwItem.key === 'string') {
            return this.registers.keys[spwItem.key]?.flat ?? (
                [this._rawNodeMap.get(spwItem)].filter(Boolean)
            );
        }

        return [];
    }

    private hydrateNode(parsed: RawSpwItem, document: SpwDocument) {
        const absorb   = this.incorporateNode.bind(this);
        const location = {moduleID: document.identifier};
        return hydrate(parsed, {absorb, location});
    }

    /**
     * Add a node to the runtime
     * @param node
     */
    private incorporateNode<K extends SpwItemKind>(node: SpwNode<K>): SpwNode<K> | null {
        if (!node?.internal) return null;

        this._rawNodeMap.set(node.internal, node);
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
        return src ? this.parser.parse(src) : null;
    }
}