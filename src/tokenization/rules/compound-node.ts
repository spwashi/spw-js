import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const compoundNodeRules =
                 [
                     rule(
                         'CompoundNode',
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
                             'compoundNode',
                         ),
                         // language=JavaScript
                             `
                             {

                                 return spwNode({
                                     kind: 'compound-node',
                                     key:  compoundNode
                                 });
                             }`,
                     ),
                 ];

