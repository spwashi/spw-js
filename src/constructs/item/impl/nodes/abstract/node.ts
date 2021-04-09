import {ISpwItemStatic, SpwItem} from '../../../abstract/item';
import {staticImplements} from '../../../util/staticImplements';
import {ISpwNode} from './interfaces/node';

@staticImplements<ISpwItemStatic>()
export abstract class SpwNode extends SpwItem implements ISpwNode {
    static readonly kind: string = 'undefined';

}