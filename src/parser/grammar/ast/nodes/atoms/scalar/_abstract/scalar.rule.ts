import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './scalar.ref';
import {containerNode} from '@grammar/ast/nodes/containers/_abstract/container.ref';
import {spaceNode} from '@grammar/utility/space/space.ref';
import {anchorNode} from '@grammar/ast/nodes/atoms/scalar/anchor/ref';
import {stringNode} from '@grammar/ast/nodes/atoms/scalar/string/ref';
import {phraseNode} from '@grammar/ast/nodes/atoms/scalar/phrase/ref';
import {numberNode} from '@grammar/ast/nodes/atoms/scalar/number/ref';

const _scalarSpecAction =
          // language=JavaScript
          `
              if (typeof spec !== 'undefined') {
                  node.key += spec.map(spec => spec.key);
                  node.spec = spec;
              }
              return node;
          `;

export const scalarRule =
                 new Rule(
                     ruleName,
                     anyOf([
                               phraseNode,
                               numberNode,
                               sequenceOf([
                                              anyOf([
                                                        anchorNode,
                                                        stringNode,
                                                    ])
                                                  .named('node'),
                                              zeroOrMoreOf(containerNode)
                                                  .named('spec'),
                                              zeroOrMoreOf(
                                                  sequenceOf([
                                                                 stringLike('.'),
                                                                 spaceNode,
                                                                 containerNode
                                                                     .named('container'),
                                                             ])
                                                      .withAction('return container'),
                                              )
                                                  .named('description'),
                                          ])
                                   .withAction(_scalarSpecAction),
                           ]),
                 )
