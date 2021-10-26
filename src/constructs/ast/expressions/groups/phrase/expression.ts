import {
  IConstructComponent,
  ComponentSubjectEvaluatorObject,
} from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { Expression } from '@constructs/ast/expressions/_abstract/expression';
import { PhraseExpressionKind } from '@constructs/ast/expressions/groups/phrase/__types';
import { IConstructClass } from '../../../_abstract/construct';

@staticImplements<IConstructClass<'phrase_expression'>>()
export class PhraseExpression extends Expression<PhraseExpressionKind> {
  static readonly kind = 'phrase_expression';

  static components = {
    items: new ConstructMetaComponent({
      name: 'items',
      subjectEvaluators: {
        stringify: (s) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(' '),
      } as ComponentSubjectEvaluatorObject,
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.items;
    },
  };
}
