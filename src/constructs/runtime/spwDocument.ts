export type SpwDocumentIdentifier = string;

export class SpwDocument {
    private readonly _identifier: SpwDocumentIdentifier;
    private readonly _src: string | null = null;

    constructor(identifier: SpwDocumentIdentifier, src: string | null = null) {
        this._identifier = identifier;
        this._src        = src;
    }

    get src(): string | null {
        return this._src;
    }

    get identifier(): SpwDocumentIdentifier {
        return this._identifier;
    }
}

type SpwDocumentMap = Map<SpwDocumentIdentifier, SpwDocument>;

export class SpwDocumentRegistry {
    private _documents: SpwDocumentMap = new Map<SpwDocumentIdentifier, SpwDocument>();

    get documents(): SpwDocumentMap {
        return this._documents;
    }

    add(spwModule: SpwDocument): this {
        this._documents.set(spwModule.identifier, spwModule)

        return this;
    }

}