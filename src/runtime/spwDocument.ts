export type SpwDocumentIdentifier = string;

/**
 * Represents
 */
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

export class SpwDocumentRegistry {
    private _modules = new Map<SpwDocumentIdentifier, SpwDocument>();

    get modules() {
        return this._modules;
    }

    register(spwModule: SpwDocument) {
        this._modules.set(spwModule.identifier, spwModule)

        return this;
    }

}