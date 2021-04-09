import {ISpwItemStatic} from '../../../../../abstract/item';
import {staticImplements} from '../../../../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export class WordNode {
    static readonly kind = 'anchor';
}