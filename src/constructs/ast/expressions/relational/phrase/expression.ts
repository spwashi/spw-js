import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '@constructs/ast/_abstract/construct';
import {ComponentDescription, ComponentEvaluatorObject} from '@constructs/ast/_abstract/types';

type Kind = 'phrase_expression';

@staticImplements<ISpwConstructStatic<'phrase_expression'>>()
export class PhraseExpression extends SpwExpression<Kind> {
    static readonly kind = 'phrase_expression';

    static components =
               {
                   body:
                       SpwConstruct.makeComponent({
                                                 name: 'body',

                                                 evaluators:
                                                     {
                                                         stringify: s => Array.from(s ?? []).join(' '),
                                                     } as ComponentEvaluatorObject,
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.body
                   },
               };
}