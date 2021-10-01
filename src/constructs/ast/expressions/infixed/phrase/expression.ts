import {
  ComponentDescription,
  ComponentEvaluatorObject,
} from '@constructs/ast/_abstract/_types/componentDescription';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PhraseExpressionKind } from '@constructs/ast/expressions/infixed/phrase/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';

@staticImplements<IConstructClass<'phrase_expression'>>()
export class PhraseExpression extends Expression<PhraseExpressionKind> {
  static readonly kind = 'phrase_expression';

  static components = {
    items: Construct.makeComponent({
      name: 'items',
      evaluators: {
        stringify: (s) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(' '),
      } as ComponentEvaluatorObject,
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.items;
    },
  };
}
