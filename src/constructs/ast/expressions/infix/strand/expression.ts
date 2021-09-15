import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { StrandExpressionKind } from '@constructs/ast/expressions/infix/strand/__types';

@staticImplements<IConstructClass<StrandExpressionKind>>()
export class StrandExpression extends Expression<StrandExpressionKind> {
  static readonly kind = 'strand_expression';

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
