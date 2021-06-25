import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { StrandExpressionKind } from '@constructs/ast/expressions/relational/strand/__types';

@staticImplements<IConstructClass<'strand'>>()
export class StrandExpression extends Expression<StrandExpressionKind> {
  static readonly kind = 'strand';

  static components = {
    items: Construct.makeComponent({
      name: 'items',

      selector: (subject: any) => {
        return subject?.items ?? [subject?.head, ...subject?.tails];
      },

      generator: function* (items, ctxt) {
        const [head, ...tails] = items;
        yield [head, ctxt];

        if (!tails || !(Symbol.iterator in Object(tails))) {
          return null;
        }

        for (const tail of tails) {
          yield [tail, ctxt];
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
