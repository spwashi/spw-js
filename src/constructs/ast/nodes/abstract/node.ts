import {ISpwItemStatic, SpwItem} from '../../abstract/item';
import {staticImplements} from '../../util/staticImplements';

@staticImplements<ISpwItemStatic>()
export abstract class SpwNode extends SpwItem {
    static readonly kind: string = 'undefined';
}