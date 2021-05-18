import {SpwNode} from '../../_abstract/node';
import {staticImplements} from '../../../_util/staticImplements';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {SpwItem} from '@constructs/ast/_abstract/item';
import {ComponentPrototype, SpwShape} from '@constructs/ast/_abstract/types';
import _ from 'lodash';

type Delimiter =
    { token: string }
    | null;
export type IContainerNodeStatic =
    {
        openDelimiter: Delimiter;
        closeDelimiter: Delimiter;
    };

type Item =
    SpwItem
    | SpwShape;

type Container<T extends SpwShape = Item,
    Open extends Delimiter = Delimiter,
    Body extends Iterable<T> = Iterable<T>,
    Close extends Delimiter = Delimiter> = { open: Open, body: Body, close: Close };

@staticImplements<IContainerNodeStatic>()
export abstract class SpwContainerNode<Kind extends SpwItemKind = SpwItemKind,
    T extends Container = Container<unknown>> extends SpwNode<Kind, T> {
    static readonly openDelimiter: Delimiter = null;

    static readonly closeDelimiter: Delimiter = null;

    static get open(): ComponentPrototype {
        const constructor = <typeof SpwContainerNode>this;
        return {
            ...SpwItem._genericComponent(),
            componentName: 'open',
            selector(subject: SpwShape) {
                return subject?.open;
            },
            generator: function* (item, key, ctxt, mut) {
                yield mut(item, key, ctxt) || constructor.openDelimiter?.token;
                yield ctxt;
                return;
            },
            evaluator: {
                stringify: function (els = []) {
                    const [token]       = els;
                    const trailingSpace = token?.length > 1 ? ' ' : '';
                    return [token, trailingSpace].join('');
                },
            },
        }
    }

    static get body(): ComponentPrototype {
        return {
            ..._.merge(
                SpwItem._genericComponent(),
                {
                    componentName: 'body',
                    selector(subject: SpwShape) {
                        return subject?.body;
                    },
                    generator: function* (_body, key, ctxt, mut) {
                        const body =
                                  !(Symbol.iterator in Object(_body))
                                  ? (_body ? [_body] : [])
                                  : _body;

                        let index = 0;
                        for (const sub of body) {
                            const inner = {
                                ...ctxt,
                                index: index++,
                            };
                            yield mut(sub, key, inner)
                        }

                        yield ctxt;
                        return;
                    },
                    evaluator: {
                        stringify: function (items) {
                            return Array.from(items ?? []).join('; ');
                        },
                    },
                } as ComponentPrototype,
            ),
        }
    }

    static get close(): ComponentPrototype {
        const constructor = <typeof SpwContainerNode>this;
        return {
            ..._.merge(
                SpwItem._genericComponent(),
                {
                    componentName: 'close',
                    selector(subject: SpwShape) { return subject?.close; },
                    generator: function* (close, key, ctxt, mut) {
                        yield mut(close, key, ctxt) || constructor.closeDelimiter?.token;
                        yield ctxt;
                        return;
                    },
                } as ComponentPrototype,
            ),
        }
    }

    static getComponentPrototypes(): [ComponentPrototype, ComponentPrototype, ComponentPrototype] {
        return [this.open, this.body, this.close];
    }
}