import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { CommonExpressionKind } from '@constructs/ast/expressions/infix/common/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';

@staticImplements<IConstructClass<CommonExpressionKind>>()
export class CommonExpression extends Expression<CommonExpressionKind> {
  static readonly kind: CommonExpressionKind = 'common_expression';

  static components = {
    items: Construct.makeComponent({
      name: 'items',

      selector: (subject: any) => {
        return subject?.items ?? [subject?.head, ...subject?.tail];
      },

      generator: function* (items, ctxt) {
        const [head, ...tail] = items;
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
          return Array.from(items ?? [])
            .filter(Boolean)
            .join('');
        },
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.items;
    },
  };
}
