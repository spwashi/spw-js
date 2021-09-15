import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { BlockExpressionKind } from './__types';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';

@staticImplements<IConstructClass<BlockExpressionKind>>()
export class Block extends Expression<BlockExpressionKind> {
  static readonly kind: BlockExpressionKind = 'block';

  static components = {
    items: Construct.makeComponent({
      name: 'items',

      selector: (subject: any) => {
        return subject?.items;
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

  static isBlockExpression(o: unknown): o is Block {
    return (o as Block)?.kind === this.kind;
  }
}
