import { Node } from '../../_abstract/node';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { Construct, ConstructComponents } from '../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/block/construct';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/common/construct';
import { OperatorDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/construct';

type Delimiter = { token: string } | null;

type IContainerNodeStatic = {
  openDelimiter: Delimiter;
  closeDelimiter: Delimiter;
};

type Item = Construct | any;

type Container<
  T extends any = Item,
  Open extends Delimiter = Delimiter,
  Body extends Iterable<T> = Iterable<T>,
  Close extends Delimiter = Delimiter,
> = { open: Open; body: Body; close: Close };

@staticImplements<IContainerNodeStatic>()
export abstract class ContainerNode<
  Kind extends ConstructKind = ConstructKind,
  T extends Container = Container<unknown>,
> extends Node<Kind, T> {
  static readonly openDelimiter: Delimiter = null;

  static readonly closeDelimiter: Delimiter = null;

  static components: ConstructComponents = {
    open: Construct.makeComponent({
      _fallback: null as Delimiter | null,
      name: 'open',
      selector: function (s) {
        return s?.open || this._fallback;
      },
      generator: function* (component, ctxt) {
        if (!Array.isArray(component)) {
          yield [component, ctxt];
          if (component?.label) {
            yield [new OperatorDelimitingOperator(), ctxt];
          }
        } else {
          for (const item of component) {
            yield [item, ctxt];
          }
        }
        return null;
      },

      evaluators: {
        stringify: function (els = []) {
          return els.join('');
        },
      },
    }),
    body: Construct.makeComponent({
      name: 'body',

      generator: function* (_body, ctxt) {
        const body = !(Symbol.iterator in Object(_body)) ? (_body ? [_body] : []) : _body;

        let first = true;
        let prev;
        for (const sub of body) {
          if (!first && Construct.isConstruct(sub)) {
            const excluded = [
              BlockDelimitingOperator,
              OperatorDelimitingOperator,
              CommonDelimitingOperator,
            ].map((c) => c.kind as ConstructKind);
            if (!excluded.includes(sub?.kind) && !excluded.includes(prev?.kind)) {
              yield [new BlockDelimitingOperator(), ctxt];
              yield [new OperatorDelimitingOperator(), ctxt];
            }
          }
          first = false;
          yield [sub, ctxt];
          prev = sub;
        }

        return null;
      },
      evaluators: {
        stringify: function (items) {
          const filtered = Array.from(items ?? []).filter(Boolean);
          return filtered.join('');
        },
      },
    }),
    close: Construct.makeComponent({
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
    ...ContainerNode.components,
    open: {
      ...ContainerNode.components.open,
      _fallback: openDelimiter,
    },
    close: {
      ...ContainerNode.components.close,
      _fallback: closeDelimiter,
    },
  };
}
