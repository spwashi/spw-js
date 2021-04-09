import {channelNodeRule} from './impl/channel/channel';
import {evaluationNodeRule} from './impl/evaluation/evaluation';
import {invocationNodeRule} from './impl/invocation/invocation';
import {performanceNodeRule} from './impl/performance/performance';
import {perspectiveNodeRule} from './impl/perspective/perspective';
import {labeledNodeRule} from './abstract/rule';
import { Rule } from '@spwashi/language/parsers/grammar/rules/rule';

export default function (): Rule[] {
    return [
        channelNodeRule,
        evaluationNodeRule,
        invocationNodeRule,
        performanceNodeRule,
        perspectiveNodeRule,
        labeledNodeRule,
    ];
}
