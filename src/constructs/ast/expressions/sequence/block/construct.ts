import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { BlockExpressionKind } from './__types';

@staticImplements<IConstructClass<BlockExpressionKind>>()
export class BlockExpression extends Expression<BlockExpressionKind> {
  static readonly kind: BlockExpressionKind = 'block';

  static components = {
    items: Construct.makeComponent({
      name: 'items',

      selector: (subject: any) => {
        const items = subject?.items;
        const arr = Array.isArray(items) ? items : [items];
        return arr;
      },

      generator: function* (items, ctxt) {
        const [head, ...tail] = Array.isArray(items) ? items : [items];
        yield [head, ctxt];

        if (!tail || !(Symbol.iterator in Object(tail))) {
          return null;
        }

        for (const tailSegment of tail) {
          yield [tailSegment, ctxt];
        }

        return null;
      },

      evaluators: {
        stringify: function (items) {
          const key = Array.from(items ?? [])
            .filter(Boolean)
            .join('; ');
          return key ? key + ';' : '';
        },
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.items;
    },
  };

  static isBlockExpression(o: unknown): o is BlockExpression {
    return (o as BlockExpression)?.kind === this.kind;
  }
}
