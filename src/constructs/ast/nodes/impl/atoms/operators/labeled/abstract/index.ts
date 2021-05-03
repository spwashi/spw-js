import {SpwNode} from '../../../../../abstract/node';
import {SpwItemKind} from '../../../../../../types/kind';
import {SpwItem} from '../../../../../../abstract/item';
import {SpwItemJunction, SpwItemKey} from '@constructs/ast/abstract/types';

export default abstract class LabeledAtomNode<Kind extends SpwItemKind,
    TokenSequence extends string,
    Junction extends SpwItemJunction = SpwItemJunction> extends SpwNode<Kind, Junction> {

    protected static token: string | undefined = undefined;
    readonly token: TokenSequence;

    constructor(node: Junction['Raw'], h?: Junction['Hydrated']) {
        super(node, h);
        this.token = (<typeof LabeledAtomNode>this.constructor).token as TokenSequence;
    }

    get key(): SpwItemKey {
        return ([this.token, ((this.hydrated?.label ?? this.raw?.label) as SpwItem)?.key].filter(Boolean).join('_') || null) as SpwItemKey;
    }
}