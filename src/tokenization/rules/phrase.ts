import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const phraseRules =
                 [
                     rule(
                         'Phrase',
                         patterns.sequence(
                             [
                                 patterns.any([
                                                  patterns.rule('Node'),
                                              ]),
                                 patterns.oneOrMore(patterns.sequence([
                                                                          patterns.any(
                                                                              [
                                                                                  patterns.sequence([
                                                                                                        patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                                                                        patterns.string('\\\\'),
                                                                                                        patterns.regExp('\\n'),
                                                                                                        patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                                                                    ]),
                                                                                  patterns.oneOrMore(patterns.regExp('\\t ')),
                                                                              ],
                                                                          ),
                                                                          patterns.any([
                                                                                           patterns.rule('Node'),
                                                                                       ], 'anchor'),
                                                                      ], null,
                                                                      '{ return anchor }'),
                                                    'body',
                                 ),
                             ],
                             'phrase',
                         ),
                         // language=JavaScript
                             `
                             {

                                 return spwNode({
                                     kind: 'phrase',
                                     key:  phrase
                                 });
                             }`,
                     ),
                 ];

