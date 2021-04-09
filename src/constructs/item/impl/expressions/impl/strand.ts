import {ISpwItemStatic, SpwItem} from '../../../abstract/item';
import {staticImplements} from '../../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export class StrandExpression extends SpwItem {
    static readonly kind = 'strand';
}