import {PhraseNode} from '@constructs/item';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {ruleName} from './phrase.ref';
import {anchorNodeRulePattern} from '../anchor/anchor.ref';
import {spaceTabPattern} from '../../../../../../../utility/space/patterns/whitespace';

const phraseSpacePattern = patterns.oneOrMore(spaceTabPattern);
const headNodeOptions    = [anchorNodeRulePattern];
const headNodePattern    = patterns.any(headNodeOptions);

// language=JavaScript
const tailItemPattern   = patterns.sequence([phraseSpacePattern, patterns.any(headNodeOptions).named('anchor')])
                                  .withAction('return anchor');
const tailSequence      = patterns.oneOrMore(tailItemPattern)
const phraseRulePattern = patterns.sequence([
                                                patterns.sequence([headNodePattern.named('head'), tailSequence.named('tail')])
                                                        .withAction('return [head, ...tail]'),
                                            ])
                                  .named('phrase');

// language=JavaScript
export const phraseNodeRule =
                 rule(ruleName,
                      phraseRulePattern,
                     `
                         const p = (phrase).reduce((p, c) => [...p, ...(Array.isArray(c) ? c : [c])], []);
                         return toSpwItem({
                                            kind: '${PhraseNode.kind}',
                                            key:  p.map(a => a.key).join(' '),
                                            body: p
                                        });
                     `);
