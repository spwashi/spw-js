import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { AggregationExpressionKind } from '@constructs/ast/expressions/infix/operations/aggregation/__types';

@staticImplements<IConstructClass<AggregationExpressionKind>>()
export class AggregationExpression extends Expression<AggregationExpressionKind> {
  static readonly kind = 'aggregation_expression';

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
