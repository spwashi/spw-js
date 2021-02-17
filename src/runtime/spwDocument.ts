export type SpwModuleIdentifier = string;

/**
 * Represents
 */
export class SpwDocument {
    private readonly _identifier: SpwModuleIdentifier;
    private readonly _src: string | null = null;

    constructor(identifier: SpwModuleIdentifier, src: string | null = null) {
        this._identifier = identifier;
        this._src        = src;
    }

    get src(): string | null {
        return this._src;
    }

    get identifier(): SpwModuleIdentifier {
        return this._identifier;
    }
}

export class SpwDocumentRegistry {
    private _modules = new Map<SpwModuleIdentifier, SpwDocument>();

    get modules() {
        return this._modules;
    }

    register(spwModule: SpwDocument) {
        this._modules.set(spwModule.identifier, spwModule)

        return this;
    }

}