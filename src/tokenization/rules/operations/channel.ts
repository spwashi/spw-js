import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {createOperationRule} from './common/createOperationRule';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';

const token               = patterns.string('#');
const whitespace          = patterns.regExp('\\t ');
export const channelRules =
                 [
                     createOperationRule(token, 'ChannelAnchor', 'channel'),
                     rule('Channel',
                          patterns.any(
                              [
                                  patterns.sequence([
                                                        patterns.rule('ChannelAnchor', 'channel'),
                                                        patterns.zeroOrMore(whitespace),
                                                        patterns.rule('Node', 'node'),
                                                        patterns.zeroOrMore(whitespace),
                                                    ],
                                                    null,
                                                    'return spwNode({kind: "selection", transport: channel, node})')],
                          ),
                     ),
                 ];