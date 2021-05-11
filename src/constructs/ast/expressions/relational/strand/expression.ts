import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {HydratedSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {Component, SpwShape} from '@constructs/ast/_abstract/types';
import {SpwNode} from '@constructs/ast/nodes/_abstract/node';
import SpwOperator from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type Kind = 'strand_expression';

type Tail = {
    operator: string | SpwOperator;
    item: HydratedSpwItem;
};

@staticImplements<ISpwItemStatic<'strand_expression'>>()
export class StrandExpression extends SpwExpression<Kind> {
    static readonly kind = 'strand_expression';

    get items(): Component<[SpwNode, ...Tail[]]> {
        return {
            select(subject: SpwShape) {
                return [
                    subject.head,
                    ...subject.tails,
                ];
            },
            generate:  function* (mut, [head, ...tails], ctxt) {
                yield mut(head, ctxt);

                if (!tails || !(Symbol.iterator in Object(tails))) return ctxt;
                for (const {operator, item} of tails) {
                    yield mut(operator, ctxt);
                    yield mut(item, ctxt)
                }

                yield ctxt;
            },
            normalize: {
                string: function (items) {
                    return Array.from(items).join('');
                },
            },
        }
    }

    serialize(): Component[] {
        return [this.items];
    }
}