import {PhraseNode} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {ruleName} from './phrase.ref';
import {anchorNode} from '../anchor/anchor.ref';
import {spaceTab} from '../../../../_base/space/whitespace.patterns';

const phraseSpaceCombinator = combinators.oneOrMoreOf(spaceTab);
const headNodeOptions       = [anchorNode];
const headNodeCombinator    = combinators.anyOf(headNodeOptions);

// language=JavaScript
const tailItemCombinator   = combinators.sequenceOf([phraseSpaceCombinator, combinators.anyOf(headNodeOptions).named('anchor')])
                                        .withAction('return anchor');
const tailSequence         = combinators.oneOrMoreOf(tailItemCombinator)
const phraseRuleCombinator = combinators.sequenceOf([
                                                        combinators.sequenceOf([headNodeCombinator.named('head'), tailSequence.named('tail')])
                                                                   .withAction('return [head, ...tail]'),
                                                    ])
                                        .named('phrase');

// language=JavaScript
export const phraseNodeRule =
                 new Rule(ruleName,
                          phraseRuleCombinator,
                     `
                         const p = (phrase).reduce((p, c) => [...p, ...(Array.isArray(c) ? c : [c])], []);
                         return toSpwItem({
                                              kind: '${PhraseNode.kind}',
                                              body: p
                                          });
                     `);
