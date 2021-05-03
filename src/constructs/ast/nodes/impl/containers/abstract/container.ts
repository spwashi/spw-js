import {SpwNode} from '../../../abstract/node';
import {staticImplements} from '../../../../util/staticImplements';
import {SpwItemKind} from '@constructs/ast/types/kind';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/abstract/interfaces/internal';
import {SpwItem} from '@constructs/ast/abstract/item';
import {Component, SpwItemJunction, SpwShape} from '@constructs/ast/abstract/types';

type IContainerNodeStatic =
    {
        openToken: string;
        closeToken: string;
    };


type HydratedContainer = HydratedSpwItem & Container<SpwItem> & { body: SpwItem[]; };
type RawContainer = RawSpwItem & Container<SpwItem> & { body: RawSpwItem[] };

type Item = SpwItem | SpwShape;

type Container<T extends SpwShape = Item, Open extends T = T, Body extends Iterable<T> = Iterable<T>, Close = T> = { open: Open, body: Body, close: Close };


@staticImplements<IContainerNodeStatic>()
export abstract class ContainerNode<Kind extends SpwItemKind,
    T extends Container = Container<unknown>,
    Junction extends SpwItemJunction = SpwItemJunction<T, HydratedContainer, RawContainer>> extends SpwNode<Kind, Junction> {
    static readonly openToken: string  = 'undefined';
    static readonly closeToken: string = 'undefined';

    get open(): Component<T['open'], string> {
        const constructor = <typeof ContainerNode>this.constructor;
        return {
            select(subject: SpwShape) { return subject.open; },
            generate:  function* (mut, item, ctxt) {
                yield mut(item, ctxt) ?? constructor.openToken;
                yield ctxt;
            },
            normalize: {
                string: function ([open]) {
                    const trailingSpace = open.length > 1 ? ' ' : '';
                    return [open, trailingSpace].join('');
                },
            },
        }
    }
    get body(): Component<T['body'], string> {
        return {
            select(subject: SpwShape) { return subject.body; },
            generate:  function* (mut, body, ctxt) {
                for (const sub of body) {
                    yield mut(sub, ctxt)
                }
                yield ctxt;
            },
            normalize: {
                string: function (body) { return Array.from(body).join(', '); },
            },
        }
    }
    get close(): Component<T['close'], string> {
        const constructor = <typeof ContainerNode>this.constructor;
        return {
            select(subject: SpwShape) {
                return subject.close;
            },

            generate:
                function* (mut, close, ctxt) {
                    yield mut(close, ctxt) ?? constructor.closeToken;
                    yield ctxt;
                },
            normalize:
                {
                    string: (function ([close]) { return close; }),
                },
        }
    }
    getComponents(): [Component, Component, Component] {
        return [this.open, this.body, this.close];
    }
}