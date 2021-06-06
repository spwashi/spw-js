import { SpwNode } from '../../../_abstract/node';
import {
  ISpwConstructStatic,
  Construct,
} from '../../../../_abstract/construct';
import { staticImplements } from '../../../../_util/typescript/staticImplements';
import {
  ComponentDescription,
  ComponentEvaluatorObject,
} from '@constructs/ast/_abstract/_types';

@staticImplements<ISpwConstructStatic<'string'>>()
export class StringNode extends SpwNode<'string'> {
  static readonly kind = 'string';

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
