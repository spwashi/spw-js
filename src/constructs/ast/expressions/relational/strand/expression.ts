import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {HydratedSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {ComponentPrototype, SpwShape} from '@constructs/ast/_abstract/types';
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

    static get items(): ComponentPrototype<[SpwNode, ...Tail[]]> {
        return {
            componentName: 'items',
            selector:      (subject: SpwShape) => {
                return subject?.items ?? [
                    subject?.head,
                    ...subject?.tails,
                ];
            },
            generator:     function* (items, key, ctxt, mut) {
                const [head, ...tails] = items;
                yield mut(head, key, ctxt);

                if (!tails || !(Symbol.iterator in Object(tails))) {
                    yield ctxt;
                    return;
                }

                for (const tail of tails) {
                    const {operator, item} = tail;
                    if (operator && item) {
                        // todo: when hydrating from a raw node, the tail is in a {item, operator} form. afterwards, it's flattened
                        yield mut(operator, key, ctxt);
                        yield mut(item, key, ctxt)
                    } else {
                        yield mut(tail, key, ctxt);
                    }
                }

                yield ctxt;
                return;
            },
            evaluator:     {
                stringify: function (items) {
                    return Array.from(items ?? []).join('');
                },
            },
        }
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [this.items];
    }
}