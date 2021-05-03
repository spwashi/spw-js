import {SpwExpression} from '@constructs/ast/expressions/abstract/expression';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic, SpwItem} from '@constructs/ast/abstract/item';
import {HydratedSpwItem} from '@constructs/ast/abstract/interfaces/internal';
import {SpwItemKey} from '@constructs/ast/abstract/types';

type Kind = 'strand_expression';

type Tails = { transport: string, tail: HydratedSpwItem }[];

@staticImplements<ISpwItemStatic<Kind>>()
export class StrandExpression extends SpwExpression<Kind> {
    static readonly kind = 'strand_expression';
    get key(): SpwItemKey {
        const head  = (this.hydrated?.head ?? this?.raw?.head) as SpwItem | undefined;
        const tails = (this.hydrated?.tails ?? this?.raw?.tails) as Tails;

        return [
            head?.key,
            tails?.map(
                ({transport, tail}) =>
                    [
                        transport,
                        tail?.key,
                    ].filter(Boolean)
                     .join(''),
            )
                 .join(''),
        ].join('');
    }
}