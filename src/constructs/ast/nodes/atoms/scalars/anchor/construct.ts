import {ISpwItemStatic, SpwItem} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {SpwNode} from '@constructs/ast/nodes/_abstract/node';
import {ComponentPrototype} from '@constructs/ast/_abstract/types';

@staticImplements<ISpwItemStatic<'anchor'>>()
export class AnchorNode extends SpwNode<'anchor'> {
    static readonly kind = 'anchor';

    static isAnchorNode(o: unknown): o is AnchorNode {
        return (o as AnchorNode)?.kind === this.kind;
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            {
                ...SpwItem._genericComponent(),
                componentName: 'label',
                selector:      s => s.label,
            },
        ];
    }
}