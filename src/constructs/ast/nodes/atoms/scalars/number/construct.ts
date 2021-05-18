import {SpwNode} from '../../../_abstract/node';
import {ISpwConstructStatic, SpwConstruct} from '../../../../_abstract/construct';
import {staticImplements} from '../../../../_util/staticImplements';
import {ComponentDescription} from '@constructs/ast/_abstract/types';


@staticImplements<ISpwConstructStatic<'number'>>()
export class NumberNode extends SpwNode<'number'> {
    static readonly kind = 'number';

    static components =
               {
                   value:
                       SpwConstruct.makeComponent({name: 'value'}),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.value;
                   },
               };

    static isNumberNode(o: unknown): o is NumberNode {
        return (o as NumberNode)?.kind === this.kind;
    }
}