import { CommonDelimiter } from '@constructs/ast';
import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionKind } from './__types';

@staticImplements<IConstructClass<CommonExpressionKind>>()
export class CommonExpression extends Expression<CommonExpressionKind> {
  static readonly kind: CommonExpressionKind = 'common_expression';

  static components = {
    items: new ConstructComponent({
      name: 'items',

      valueSelector: (subject: any) => {
        const items = subject?.items;
        const arr = Array.isArray(items) ? items : [items];
        return arr;
      },

      locationGenerator: function* (items, ctxt) {
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
            .join(CommonDelimiter.token + '');
          return key;
        },
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.items;
    },
  };

  static isCommonExpression(o: unknown): o is CommonExpression {
    return (o as CommonExpression)?.kind === this.kind;
  }
}
