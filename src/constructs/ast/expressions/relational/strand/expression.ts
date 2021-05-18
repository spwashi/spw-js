import {SpwExpression} from '@constructs/ast/expressions/_abstract/expression';
import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, SpwConstruct} from '@constructs/ast/_abstract/construct';
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
                                                                  const {operator, item} = tail;
                                                                  if (operator && item) {
                                                                      // todo: when hydrating from a raw node, the tail is in a {item, operator} form. afterwards, it's flattened
                                                                      yield mut(operator, key, ctxt);
                                                                      yield mut(item, key, ctxt)
                                                                  } else {
                                                                      yield mut(tail, key, ctxt);
                                                                  }
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