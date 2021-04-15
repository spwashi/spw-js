import {SpwNode} from '../../../abstract/node';
import {staticImplements} from '../../../../util/staticImplements';
import {SpwItemKind} from '@constructs/ast/types/kind';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';
import {SpwItemKey} from '@constructs/ast/abstract/item';

type IContainerNodeStatic =
    {
        openToken: string;
        closeToken: string;
    };

type ContainerSpwItem = HydratedSpwItem & {
    open: HydratedSpwItem;
    close: HydratedSpwItem;
    body: HydratedSpwItem[];
};

type RawContainerSpwItem = RawSpwItem & { body: RawSpwItem[] };

@staticImplements<IContainerNodeStatic>()
export abstract class ContainerNode<K extends SpwItemKind,
    H extends ContainerSpwItem = ContainerSpwItem,
    U extends RawContainerSpwItem = RawContainerSpwItem> extends SpwNode<K, H, U> {
    static readonly openToken: string  = 'undefined';
    static readonly closeToken: string = 'undefined';
    get key(): SpwItemKey {
        const constructor = <typeof ContainerNode>this.constructor;
        const body        = this.hydrated?.body ?? this.raw?.body ?? [];
        const open        = (this.hydrated?.open?.key ?? constructor.openToken) as string;
        return [
            open.length > 1 ? open + ' ' : open,
            body?.map(i => i?.key)?.join(', '),
            this.hydrated?.close?.key ?? constructor.closeToken,
        ].join('');
    }
}