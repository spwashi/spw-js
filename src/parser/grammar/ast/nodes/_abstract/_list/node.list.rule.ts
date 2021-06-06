import { atomNodeRules } from '@grammar/ast/nodes/atoms/_abstract/_list/atom.list.rule';
import { containerNodeRules } from '@grammar/ast/nodes/containers/_abstract/_list/container.list.rule';
import { nodeRule } from '@grammar/ast/nodes/_abstract/node.rule';

const nodeRules = [nodeRule, ...containerNodeRules, ...atomNodeRules];
export default nodeRules;
