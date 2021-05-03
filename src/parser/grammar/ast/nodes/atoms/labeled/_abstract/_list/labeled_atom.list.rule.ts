import {channelNodeRule} from '../../channel/channel.rule';
import {evaluationNodeRule} from '../../evaluation/evaluation.rule';
import {invocationNodeRule} from '../../invocation/invocation.rule';
import {performanceNodeRule} from '../../performance/performance.rule';
import {perspectiveNodeRule} from '../../perspective/perspective.rule';
import {labeledAtomNodeRule} from '../labeled_atom.rule';

export default [
    labeledAtomNodeRule,
    channelNodeRule,
    evaluationNodeRule,
    invocationNodeRule,
    performanceNodeRule,
    perspectiveNodeRule,
]