import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';

const anchorPattern2 = combinators.sequenceOf([
                                                  combinators.oneOrMoreOf(combinators.regExpLike('a-zA-Z')).named('head'),
                                                  combinators.zeroOrMoreOf(combinators.regExpLike('a-zA-Z\\d')).named('tail'),
                                              ])
    // language=JavaScript
                                  .withAction('return [...head, ...tail].join("");');
const anchorPattern1 = combinators.sequenceOf([
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
const ampersand      = combinators.stringLike('&');

const anchorComponent = combinators.sequenceOf([combinators.anyOf([anchorPattern1, anchorPattern2, ampersand])
                                                           .named('anchor')])

// language=JavaScript
const _action = `return toSpwItem({kind: 'anchor', label: anchor});`;

export const anchorRule = new Rule('Anchor', anchorComponent, _action);
