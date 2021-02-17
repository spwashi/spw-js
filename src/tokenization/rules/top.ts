import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';
import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';

const whitespace     = patterns.regExp('\\t \\n');
export const topRule =
                 rule(
                     'Top',
                     patterns.any([
                                      patterns.rule('DomainBody'),
                                      patterns.sequence([
                                                            patterns.any([whitespace, patterns.rule('Strand'), patterns.rule('Node')], 'head'), whitespace,
                                                            patterns.oneOrMore(patterns.any([whitespace, patterns.rule('Strand'), patterns.rule('Node')]), 'tail'),
                                                        ],
                                                        null,
                                                        '{ return [head, ...tail] }'),
                                  ],
                                  'body',
                     ),
                     // language=JavaScript
                         `
                         {
                             const items = Array.isArray(body) ? body.map(item => {
                                                                         if (item && item.kind) {
                                                                             return item;
                                                                         }
                                                                         return undefined
                                                                     })
                                                                     .filter(item => typeof item !== 'undefined')
                                                               : body;
                             return items.length === 1 ? items [0] : items;
                         }
                     `,
                 );