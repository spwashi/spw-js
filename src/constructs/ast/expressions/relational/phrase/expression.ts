import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic, SpwItem} from '@constructs/ast/_abstract/item';
import {SpwItemKey} from '@constructs/ast/_abstract/types';

type Kind = 'phrase_expression';

@staticImplements<ISpwItemStatic<'phrase_expression'>>()
export class PhraseExpression extends SpwExpression<Kind> {
    static readonly kind = 'phrase_expression';
    get key(): SpwItemKey {
        return ((this?.hydrated?.items ?? []) as SpwItem[]).map(i => i.key ?? '&').join(' ');
    }
}