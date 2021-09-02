import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { ComponentDescription, ComponentEvaluatorObject } from '@constructs/ast/_abstract/_types';
import { PhraseExpressionKind } from '@constructs/ast/expressions/infix/phrase/__types';

@staticImplements<IConstructClass<'phrase_expression'>>()
export class PhraseExpression extends Expression<PhraseExpressionKind> {
  static readonly kind = 'phrase_expression';

  static components = {
    body: Construct.makeComponent({
      name: 'body',
      evaluators: {
        stringify: (s) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(' '),
      } as ComponentEvaluatorObject,
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.body;
    },
  };
}
