import {SpwExpression} from '@constructs/ast/expressions/abstract/expression';
import {staticImplements} from '@constructs/ast/util/staticImplements';
import {ISpwItemStatic, SpwItem} from '@constructs/ast/abstract/item';
import {SpwItemKey} from '@constructs/ast/abstract/types';

type Kind = 'phrase_expression';

@staticImplements<ISpwItemStatic<Kind>>()
export class PhraseExpression extends SpwExpression<Kind> {
    static readonly kind = 'phrase_expression';
    get key(): SpwItemKey {
        return ((this?.hydrated?.items ?? []) as SpwItem[]).map(i => i.key ?? '&').join(' ');
    }
}