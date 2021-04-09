import {ruleName} from './ref';
import {channelNodeRulePattern} from '../impl/channel/channel';
import {evaluationNodeRulePattern} from '../impl/evaluation/evaluation';
import {invocationNodeRulePattern} from '../impl/invocation/invocation';
import {performanceNodeRulePattern} from '../impl/performance/performance';
import {perspectiveNodeRulePattern} from '../impl/perspective/perspective';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const labeledNodeRule = rule(ruleName,
                                    patterns.any([
                                                     channelNodeRulePattern,
                                                     evaluationNodeRulePattern,
                                                     invocationNodeRulePattern,
                                                     performanceNodeRulePattern,
                                                     perspectiveNodeRulePattern,
                                                 ]));