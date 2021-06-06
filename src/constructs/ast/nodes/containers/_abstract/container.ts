import { SpwNode } from '../../_abstract/node';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { ConstructKind } from '@constructs/ast/_types/kind';
import {
  ConstructComponents,
  SpwConstruct,
} from '@constructs/ast/_abstract/spwConstruct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';

type Delimiter = { token: string } | null;

type IContainerNodeStatic = {
  openDelimiter: Delimiter;
  closeDelimiter: Delimiter;
};

type Item = SpwConstruct | any;

type Container<
  T extends any = Item,
  Open extends Delimiter = Delimiter,
  Body extends Iterable<T> = Iterable<T>,
  Close extends Delimiter = Delimiter,
> = { open: Open; body: Body; close: Close };

@staticImplements<IContainerNodeStatic>()
export abstract class SpwContainerNode<
  Kind extends ConstructKind = ConstructKind,
  T extends Container = Container<unknown>,
> extends SpwNode<Kind, T> {
  static readonly openDelimiter: Delimiter = null;

  static readonly closeDelimiter: Delimiter = null;

  static components: ConstructComponents = {
    open: SpwConstruct.makeComponent({
      _fallback: null as Delimiter | null,
      name: 'open',
      selector: function (s) {
        return s?.open || this._fallback;
      },

      evaluators: {
        stringify: function (els = []) {
          const [token] = els;
          const trailingSpace = token?.length > 1 ? ' ' : '';
          return [token, trailingSpace].join('');
        },
      },
    }),
    body: SpwConstruct.makeComponent({
      name: 'body',

      generator: function* (_body, ctxt) {
        const body = !(Symbol.iterator in Object(_body))
          ? _body
            ? [_body]
            : []
          : _body;

        for (const sub of body) {
          yield [sub, ctxt];
        }

        return null;
      },
      evaluators: {
        stringify: function (items) {
          const filtered = Array.from(items ?? []).filter(Boolean);
          return filtered.join('; ');
        },
      },
    }),
    close: SpwConstruct.makeComponent({
      _fallback: null as Delimiter | null,
      name: 'close',
      selector: function (s) {
        return s?.close || this._fallback;
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.open;
      yield this.body;
      yield this.close;
    },
  };
}

type DelimitedConstruct = {
  openDelimiter: Delimiter;
  closeDelimiter: Delimiter;
};
export function containerComponents({
  openDelimiter,
  closeDelimiter,
}: DelimitedConstruct): ConstructComponents {
  return {
    ...SpwContainerNode.components,
    open: {
      ...SpwContainerNode.components.open,
      _fallback: openDelimiter,
    },
    close: {
      ...SpwContainerNode.components.close,
      _fallback: closeDelimiter,
    },
  };
}
