import {SpwExpression} from '../../_abstract/expression';
import {staticImplements} from '../../../_util/typescript/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '../../../_abstract/spwConstruct';
import {ComponentDescription} from '@constructs/ast/_abstract/_types';
import {DirectionOperator} from '@constructs/ast';

type Kind = 'perspective_expression';

@staticImplements<ISpwConstructStatic<'perspective_expression'>>()
export class PerspectiveExpression extends SpwExpression<Kind> {
    static readonly kind = 'perspective_expression';

    static components =
               {
                   source:
                       SpwConstruct.makeComponent({name: 'source'}),

                   lens:
                       SpwConstruct.makeComponent({name: 'lens'}),

                   target:
                       SpwConstruct.makeComponent({
                                                      name:       'target',
                                                      generator:  function* (target, ctxt) {
                                                          let directionOperator;

                                                          // todo: relic from hydration
                                                          if (Array.isArray(target)) {
                                                              ([directionOperator, target] = target)
                                                          }

                                                          if (target) {
                                                              yield [
                                                                  directionOperator ?? new DirectionOperator(),
                                                                  ctxt,
                                                              ]
                                                          }

                                                          if (target) {
                                                              yield [target, ctxt];
                                                          }

                                                          return null;
                                                      },
                                                      evaluators: {
                                                          stringify: ([direction, target] = []) => [
                                                              direction, target,
                                                          ].join(''),
                                                      },
                                                  }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.source;
                       yield this.lens;
                       yield this.target;
                   },
               };


    static isPerspectiveExpression(o: unknown): o is PerspectiveExpression {
        return (o as PerspectiveExpression)?.kind === this.kind;
    }
}