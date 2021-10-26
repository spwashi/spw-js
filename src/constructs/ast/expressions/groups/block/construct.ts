import { BlockDelimiter } from '@constructs/ast';
import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { BlockExpressionKind } from './__types';

@staticImplements<IConstructClass<BlockExpressionKind>>()
export class BlockExpression extends Expression<BlockExpressionKind> {
  static readonly kind: BlockExpressionKind = 'block';

  static components = {
    items: new ConstructMetaComponent({
      name: 'items',

      valueSelector: (subject: any) => {
        const items = subject?.items;
        const arr = Array.isArray(items) ? items : [items];
        return arr;
      },

      subjectGenerator: function* (items, ctxt) {
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

      subjectEvaluators: {
        stringify: function (items) {
          const key = Array.from(items ?? [])
            .filter(Boolean)
            .join(BlockDelimiter.token + ' ');
          return key ? key + ((items?.length ?? 0) > 1 ? BlockDelimiter.token : '') : '';
        },
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.items;
    },
  };

  static isBlockExpression(o: unknown): o is BlockExpression {
    return (o as BlockExpression)?.kind === this.kind;
  }
}
