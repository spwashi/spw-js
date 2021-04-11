import {ruleName} from './ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {perspectiveNodeRuleCombinator} from '../perspective/perspective.ref';
import {performanceNodeRuleCombinator} from '../performance/performance.ref';
import {invocationNodeRuleCombinator} from '../invocation/invocation.ref';
import {evaluationNodeRuleCombinator} from '../evaluation/evaluation.ref';
import {channelNodeRuleCombinator} from '../channel/channel.ref';

export const labeledNodeRule = new Rule(ruleName,
                                        combinators.anyOf([
                                                              channelNodeRuleCombinator,
                                                              evaluationNodeRuleCombinator,
                                                              invocationNodeRuleCombinator,
                                                              performanceNodeRuleCombinator,
                                                              perspectiveNodeRuleCombinator,
                                                          ]));