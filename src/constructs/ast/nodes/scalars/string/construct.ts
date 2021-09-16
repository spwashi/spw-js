import { ComponentDescription, ComponentEvaluatorObject } from '@constructs/ast/_abstract/_types';
import { StringNodeKind } from '@constructs/ast/nodes/scalars/string/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<StringNodeKind>;

@staticImplements<StaticType>()
export class StringNode extends Node<StringNodeKind> {
  static readonly kind: StringNodeKind = 'string';

  static components = {
    open: Construct.makeComponent({
      name: 'open',

      selector: () => '"',
    }),

    body: Construct.makeComponent({
      name: 'body',

      evaluators: {
        stringify: (s: string[] | undefined) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(''),
      } as ComponentEvaluatorObject,
    }),

    close: Construct.makeComponent({
      name: 'close',

      selector: () => '"',
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.open;
      yield this.body;
      yield this.close;
    },
  };

  static isStringNode(o: unknown): o is StringNode {
    return (o as StringNode)?.kind === this.kind;
  }
}
