import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {ComponentPrototype} from '@constructs/ast/_abstract/types';


@staticImplements<ISpwItemStatic<'number'>>()
export class NumberNode extends SpwNode<'number'> {
    static readonly kind = 'number';
    static isNumberNode(o: unknown): o is NumberNode {
        return (o as NumberNode)?.kind === this.kind;
    }
    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            {
                ...NumberNode._genericComponent(),
                componentName: 'value',
            },
        ];
    }
}