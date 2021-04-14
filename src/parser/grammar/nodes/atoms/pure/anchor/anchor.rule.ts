import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';

const anchorCombinator2   = combinators.sequenceOf([
                                                       combinators.oneOrMoreOf(combinators.regExpLike('a-zA-Z')).named('head'),
                                                       combinators.zeroOrMoreOf(combinators.regExpLike('a-zA-Z\\d')).named('tail'),
                                                   ])
    // language=JavaScript
                                       .withAction('return [...head, ...tail].join("");');
const anchorCombinator1   = combinators.sequenceOf([
                                                       combinators.oneOrMoreOf(combinators.regExpLike('a-zA-Z')).named('head'),
                                                       combinators.oneOrMoreOf(combinators.sequenceOf([
                                                                                                          combinators.anyOf([combinators.stringLike('-'), combinators.stringLike('_')]).named('line'),
                                                                                                          combinators.oneOrMoreOf(combinators.regExpLike('a-zA-Z\\d')).named('chars'),
                                                                                                      ])
                                                                                          .withAction(/*language=JavaScript*/ `return line + chars.join('')`),
                                                       ).named('tail'),
                                                   ])
    // language=JavaScript
                                       .withAction('return [...head, ...tail].join("");');
const ampersandCombinator = combinators.stringLike('&');

const anchorComponent = combinators.sequenceOf([combinators.anyOf([anchorCombinator1, anchorCombinator2, ampersandCombinator])
                                                           .named('anchor')])

// language=JavaScript
const _action = `return toSpwItem({kind: 'anchor', key: anchor});`;

export const anchorRule = new Rule('Anchor', anchorComponent, _action);
