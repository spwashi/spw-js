import {SpwNode} from '../../_abstract/node';
import {staticImplements} from '../../../_util/staticImplements';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {HydratedSpwItem, RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import {SpwItem} from '@constructs/ast/_abstract/item';
import {Component, SpwItemJunction, SpwShape} from '@constructs/ast/_abstract/types';

type Delimiter =
    { token: string }
    | null;
export type IContainerNodeStatic =
    {
        openDelimiter: Delimiter;
        closeDelimiter: Delimiter;
    };
type HydratedContainer =
    HydratedSpwItem
    & Container<SpwItem>
    & { body: SpwItem[]; };
type RawContainer =
    RawSpwItem
    & Container<SpwItem>
    & { body: RawSpwItem[] };
type Item =
    SpwItem
    | SpwShape;
type Container<T extends SpwShape = Item,
    Open extends Delimiter = Delimiter,
    Body extends Iterable<T> = Iterable<T>,
    Close extends Delimiter = Delimiter> = { open: Open, body: Body, close: Close };

@staticImplements<IContainerNodeStatic>()
export abstract class SpwContainerNode<Kind extends SpwItemKind,
    T extends Container = Container<unknown>,
    Junction extends SpwItemJunction = SpwItemJunction<T, HydratedContainer, RawContainer>> extends SpwNode<Kind, Junction> {
    static readonly openDelimiter: Delimiter  = null;
    static readonly closeDelimiter: Delimiter = null;
    get open(): Component<T['open'], string> {
        const constructor = <typeof SpwContainerNode>this.constructor;
        return {
            select(subject: SpwShape) { return subject.open; },
            generate:  function* (mut, item, ctxt) {
                yield mut(item, ctxt) || constructor.openDelimiter?.token;
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
                if (!body || !(Symbol.iterator in Object(body))) return ctxt;

                for (const sub of body) {
                    yield mut(sub, ctxt)
                }
                yield ctxt;
            },
            normalize: {
                string: function (body) { return Array.from(body).join('; '); },
            },
        }
    }
    get close(): Component<T['close'], string> {
        const constructor = <typeof SpwContainerNode>this.constructor;
        return {
            select(subject: SpwShape) { return subject.close; },
            generate:
                function* (mut, close, ctxt) {
                    yield mut(close, ctxt) || constructor.closeDelimiter?.token;
                    yield ctxt;
                },
            normalize:
                {
                    string: (function ([close]) { return close; }),
                },
        }
    }
    serialize(): [Component, Component, Component] {
        return [this.open, this.body, this.close];
    }
}