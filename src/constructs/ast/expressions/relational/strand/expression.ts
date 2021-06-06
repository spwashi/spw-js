import { SpwExpression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  SpwConstruct,
} from '@constructs/ast/_abstract/spwConstruct';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';

type Kind = 'strand';

@staticImplements<ISpwConstructStatic<'strand'>>()
export class StrandExpression extends SpwExpression<Kind> {
  static readonly kind = 'strand';

  static components = {
    items: SpwConstruct.makeComponent({
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
