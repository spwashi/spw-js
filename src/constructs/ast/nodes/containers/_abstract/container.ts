import {SpwNode} from '../../_abstract/node';
import {staticImplements} from '../../../_util/staticImplements';
import {SpwItemKind} from '@constructs/ast/_types/kind';
import {ConstructComponents, SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {ComponentDescription, SpwShape} from '@constructs/ast/_abstract/types';

type Delimiter =
    { token: string }
    | null;
export type IContainerNodeStatic =
    {
        openDelimiter: Delimiter;
        closeDelimiter: Delimiter;
    };

type Item =
    SpwConstruct
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

    static components: ConstructComponents =
               {
                   open:
                       SpwConstruct.makeComponent({
                                                 _fallback: null as Delimiter | null,
                                                 name:      'open',
                                                 selector:  function (s) {
                                                     return s?.open || this._fallback;
                                                 },

                                                 evaluators:
                                                     {
                                                         stringify:
                                                             function (els = []) {
                                                                 const [token]       = els;
                                                                 const trailingSpace = token?.length > 1 ? ' ' : '';
                                                                 return [token, trailingSpace].join('');
                                                             },
                                                     },
                                             }),
                   body:
                       SpwConstruct.makeComponent({
                                                 name: 'body',

                                                 generator:
                                                     function* (_body, key, ctxt, mut) {
                                                         const body =
                                                                   !(Symbol.iterator in Object(_body))
                                                                   ? (_body ? [_body] : [])
                                                                   : _body;

                                                         let index = 0;
                                                         for (const sub of body) {
                                                             const inner =
                                                                       {
                                                                           ...ctxt,
                                                                           index: index++,
                                                                       };
                                                             yield mut(sub, key, inner)
                                                         }

                                                         yield ctxt;
                                                         return;
                                                     },
                                                 evaluators:
                                                     {
                                                         stringify: function (items) {
                                                             return Array.from(items ?? []).join('; ');
                                                         },
                                                     },
                                             }),
                   close:
                       SpwConstruct.makeComponent({
                                                 _fallback: null as Delimiter | null,
                                                 name:      'close',
                                                 selector:  function (s) {
                                                     return s?.close || this._fallback;
                                                 },
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.open;
                       yield this.body;
                       yield this.close;
                   },
               };
}

type DelimitedConstruct = {
    openDelimiter: Delimiter,
    closeDelimiter: Delimiter
};
export function containerComponents({openDelimiter, closeDelimiter}: DelimitedConstruct): ConstructComponents {
    return {
        ...SpwContainerNode.components,
        open:
            {
                ...SpwContainerNode.components.open,
                _fallback: openDelimiter,
            },
        close:
            {
                ...SpwContainerNode.components.close,
                _fallback: closeDelimiter,
            },
    };
}