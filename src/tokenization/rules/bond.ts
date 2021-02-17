import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


export const bondRules =
                 [
                     rule('BondOperator',
                          patterns.any([
                                           patterns.sequence(
                                               [
                                                   patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                   patterns.oneOrMore(patterns.string('-'), 'eq', '{ return eq.join(\'\')}'),
                                                   patterns.zeroOrMore(patterns.regExp('\\t ')),
                                               ],
                                           ),
                                       ],
                                       'operator'),
                          // language=JavaScript
                          `
                             {
                                 return spwNode({
                                     kind:  'bond-operator',
                                     basis: operator.join("")
                                 })
                             }
                         `,
                     ),
                     rule('Bond',
                          patterns.sequence([
                                                patterns.rule('Node', 'head'),
                                                patterns.zeroOrMore(patterns.regExp('\\t ')),
                                                patterns.oneOrMore(
                                                    patterns.sequence(
                                                        [
                                                            patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                            patterns.rule('BondOperator', 'operator'),
                                                            patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                                                            patterns.rule('Node', 'node'),
                                                        ],
                                                        null,
                                                        // language=JavaScript

                                                        `
                                                            {
                                                                return spwNode({kind: 'bond-tail', node, operator});
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
                                     kind: 'bond',
                                     head: head,
                                     tail: tail
                                 });
                             }
                         `),
                 ];

