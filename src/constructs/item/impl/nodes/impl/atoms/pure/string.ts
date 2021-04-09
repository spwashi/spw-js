import {SpwNode} from '../../../abstract/node';
import {ISpwItemStatic} from '../../../../../abstract/item';
import {staticImplements} from '../../../../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export class StringNode extends SpwNode {
    static readonly kind = 'string';
}