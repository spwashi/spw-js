import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {ComponentDescription} from '@constructs/ast/_abstract/types';


@staticImplements<ISpwConstructStatic<'strand_tail'>>()
export class StrandTail extends SpwExpression<'strand_tail'> {
    static readonly kind = 'strand_tail';

    static components =
               {
                   operator:
                       SpwConstruct.makeComponent({name: 'operator'}),
                   item:
                       SpwConstruct.makeComponent({name: 'item'}),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.operator;
                       yield this.item;
                   },
               };
}