import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic} from '../../../../../abstract/item';
import {staticImplements} from '../../../../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export class PhraseNode extends SpwNode {
    static readonly kind = 'phrase';
}