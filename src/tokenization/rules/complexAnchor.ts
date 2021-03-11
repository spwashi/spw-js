import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const complexAnchorRules =
                 [
                     rule(
                         'complexAnchor',
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
                                                                                                        patterns.string('.'),
                                                                                                        patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                                                                    ]),
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
                             'complexAnchor',
                         ),
                         // language=JavaScript
                         `
                             {

                                 return spwNode({
                                                    kind: 'complexAnchor',
                                                    key:  complexAnchor,
                                                    body: complexAnchor
                                                });
                             }`,
                     ),
                 ];

