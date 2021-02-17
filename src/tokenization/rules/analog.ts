import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const analogRules =
                 [
                     rule('Analog',
                          patterns.sequence([
                                                patterns.rule('Node', 'head'),
                                                patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                patterns.oneOrMore(
                                                    patterns.sequence(
                                                        [
                                                            patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                            patterns.rule('AnalogicalTransport', 'operator'),
                                                            patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                            patterns.rule('Node', 'node'),
                                                        ],
                                                        null,
                                                        // language=JavaScript

                                                        `
                                                            {
                                                                return spwNode({kind: 'analog-tail', node, operator});
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
                                     kind: 'analog',
                                     head: head,
                                     tail: tail
                                 });
                             }
                         `),
                 ];

