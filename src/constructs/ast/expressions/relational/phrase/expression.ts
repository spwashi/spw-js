import { SpwExpression } from '@constructs/ast/expressions/_abstract/expression';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ISpwConstructStatic, Construct } from '../../../_abstract/construct';
import {
  ComponentDescription,
  ComponentEvaluatorObject,
} from '@constructs/ast/_abstract/_types';

type Kind = 'phrase_expression';

@staticImplements<ISpwConstructStatic<'phrase_expression'>>()
export class PhraseExpression extends SpwExpression<Kind> {
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
