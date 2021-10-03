import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { ConstructKind } from '@constructs/ast/_types/kinds';
import { BlockExpression } from '@constructs/ast/expressions/sequence/block/construct';
import { Construct, ConstructComponents } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

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
    open: new ConstructComponent({
      name: 'open',
      _fallback: null,
      selector: function (s) {
        return s?.open || this._fallback;
      },
      generator: function* (component, ctxt) {
        if (!Array.isArray(component) && Construct.isConstruct(component)) {
          yield [component, ctxt];
          // if (component?.internal?.label) {
          //   yield [new NodeDelimiter(), ctxt];
          // }
        } else {
          for (const item of component) {
            yield [item, ctxt];
          }
        }
        return null;
      },

      evaluators: {
        stringify: function (els = []) {
          const delimiter = els.join('');
          // add a space after complex delimiters
          return delimiter + (delimiter.length > 1 ? ' ' : '');
        },
      },
    }),
    body: new ConstructComponent({
      name: 'body',
      selector: function (s) {
        let body = s?.body;
        if (!BlockExpression.isBlockExpression(body)) {
          body = new BlockExpression({ items: [body].filter(Boolean) });
        }
        return body || this._fallback;
      },
    }),
    close: new ConstructComponent({
      _fallback: null,
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
