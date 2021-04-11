import {ISpwItemStatic, SpwItem} from '../../abstract/item';
import {staticImplements} from '../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export class PhraseExpression extends SpwItem {
    static readonly kind = 'phrase_expression';
}