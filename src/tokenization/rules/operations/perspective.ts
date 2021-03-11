import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {createOperationRule} from './common/createOperationRule';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';

const token                   = patterns.string('@');
const whitespace              = patterns.regExp('\\t ');
export const perspectiveRules =
                 [
                     createOperationRule(token, 'PerspectiveAnchor', 'perspective'),
                     rule('Perspective',
                          patterns.any(
                              [
                                  patterns.sequence([
                                                        patterns.rule('PerspectiveAnchor', 'perspective'),
                                                        patterns.zeroOrMore(whitespace),
                                                        patterns.any([
                                                                         patterns.rule('Phrase'),
                                                                         patterns.rule('complexAnchor'),
                                                                         patterns.rule('Channel'),
                                                                         patterns.rule('Node'),
                                                                     ], 'node'),
                                                        patterns.zeroOrMore(whitespace),
                                                    ],
                                                    null,
                                                    'return spwNode({kind: "selection", transport: perspective, node})')],
                          ),
                     ),
                 ];