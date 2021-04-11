export type SpwDocumentID = string;

export class SpwDocument {
    private readonly _identifier: SpwDocumentID;
    private readonly _src: string | null = null;

    constructor(identifier: SpwDocumentID, src: string | null = null) {
        this._identifier = identifier;
        this._src        = src;
    }

    get src(): string | null {
        return this._src;
    }

    get identifier(): SpwDocumentID {
        return this._identifier;
    }
}

type SpwDocumentMap = Map<SpwDocumentID, SpwDocument>;

export class SpwDocumentRegistry {
    private _documents: SpwDocumentMap = new Map<SpwDocumentID, SpwDocument>();

    get documents(): SpwDocumentMap {
        return this._documents;
    }

    add(spwModule: SpwDocument): this {
        this._documents.set(spwModule.identifier, spwModule)

        return this;
    }

}