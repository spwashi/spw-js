import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';
import {ComponentDescription, SpwShape} from '@constructs/ast/_abstract/types';

type Kind = 'strand_expression';


@staticImplements<ISpwConstructStatic<'strand_expression'>>()
export class StrandExpression extends SpwExpression<Kind> {
    static readonly kind = 'strand_expression';

    static components =
               {
                   items:
                       SpwConstruct.makeComponent({
                                                      name:
                                                          'items',

                                                      selector:
                                                          (subject: SpwShape) => {
                                                              return subject?.items ?? [
                                                                  subject?.head,
                                                                  ...subject?.tails,
                                                              ];
                                                          },

                                                      generator:
                                                          function* (items, key, ctxt, mut) {
                                                              const [head, ...tails] = items;
                                                              yield mut(head, key, ctxt);

                                                              if (!tails || !(Symbol.iterator in Object(tails))) {
                                                                  yield ctxt;
                                                                  return;
                                                              }

                                                              for (const tail of tails) {
                                                                  yield mut(tail, key, ctxt);
                                                              }

                                                              yield ctxt;
                                                              return;
                                                          },

                                                      evaluators:
                                                          {
                                                              stringify: function (items) {
                                                                  return Array.from(items ?? []).join('');
                                                              },
                                                          },
                                                  }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.items
                   },
               };
}