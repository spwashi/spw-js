import {SpwNode, SpwNodeKeyValue} from '../spwNode';

class TransportBehavior {
    private readonly _key: string;

    constructor(key: string) {
        this._key = key;
    }

    get key(): string {
        return this._key;
    }
}

export class SpwTransportNode extends SpwNode {
    private _behavior?: TransportBehavior;

    private _basis?: '=>';

    get basis() {
        return this._basis;
    }

    set(key: keyof this, value: SpwNodeKeyValue): this {
        switch (key) {
            case 'basis':
                switch (value) {
                    case '=>':
                        this._behavior = new TransportBehavior(value);
                        this._basis    = value;
                }
                return this;
        }
        super.set(key, value);
        return this;
    }

}