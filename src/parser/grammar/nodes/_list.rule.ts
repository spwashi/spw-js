import {atomNodeRules} from '@grammar/nodes/atoms/_list.rule';
import {containerNodeRules} from '@grammar/nodes/containers/_list.rule';
import {nodeRule} from '@grammar/nodes/abstract/rule';

const nodeRules = [
    nodeRule,
    ...atomNodeRules,
    ...containerNodeRules,
];
export default nodeRules