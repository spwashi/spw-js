import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {anyOf, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';
import {containerNode} from '@grammar/nodes/containers/abstract/ref';
import {spaceNode} from '@grammar/_base/space/space.ref';
import {anchorNode} from '@grammar/nodes/atoms/pure/anchor/anchor.ref';
import {stringNode} from '@grammar/nodes/atoms/pure/string/string.ref';
import {phraseNode} from '@grammar/nodes/atoms/pure/phrase/phrase.ref';
import {numberNode} from '@grammar/nodes/atoms/pure/number/number.ref';

export const pureAtomRule =
                 new Rule(
                     ruleName,
                     anyOf([
                               phraseNode,
                               numberNode,
                               sequenceOf([
                                              combinators.anyOf([anchorNode, stringNode]).named('node'),
                                              zeroOrMoreOf(containerNode).named('spec'),
                                              zeroOrMoreOf(
                                                  sequenceOf([stringLike('.'), spaceNode, containerNode.named('container')])
                                                      .withAction('return container'),
                                              )
                                                  .named('description'),
                                          ])
                                   .withAction(/* language=JavaScript */ `
                                       if (typeof spec !== 'undefined') {
                                           node.key += spec.map(spec => spec.key);
                                           node.spec = spec;
                                       }
                                       return node;
                                   `),
                           ]),
                 )
