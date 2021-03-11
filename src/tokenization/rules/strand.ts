import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const strandRule =
                 rule('Strand',
                      patterns.sequence([
                                            patterns.any([
                                                             patterns.rule('Phrase'),
                                                             patterns.rule('complexAnchor'),
                                                             patterns.rule('Node'),
                                                         ], 'head'),
                                            patterns.zeroOrMore(patterns.regExp('\\t ')),
                                            patterns.oneOrMore(
                                                patterns.sequence(
                                                    [
                                                        patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                        patterns.any([
                                                                         patterns.rule('ObjectiveTransport', 'transport'),
                                                                         patterns.rule('SubjectiveTransport', 'transport'),
                                                                     ], 'transport'),
                                                        patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                        patterns.any([
                                                                         patterns.rule('Phrase'),
                                                                         patterns.rule('complexAnchor'),
                                                                         patterns.rule('Node'),
                                                                     ], 'node'),
                                                    ],
                                                    null,
                                                    // language=JavaScript

                                                        `
                                                        {
                                                            return spwNode({kind: 'strand-tail', node, transport});
                                                        }
                                                    `,
                                                ),
                                                'tail',
                                            ),
                                        ],
                      ),
                      // language=JavaScript
                         `
                         {
                             return spwNode({
                                                kind: 'strand',
                                                head: head,
                                                tail: tail
                                            });
                         }
                     `);

