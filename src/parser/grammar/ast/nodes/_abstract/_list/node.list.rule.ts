import { containerNodeRules } from '@grammar/ast/nodes/containers/_abstract/_list/container.list.rule';
import { nodeRule } from '@grammar/ast/nodes/_abstract/node.rule';
import { scalarRules } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/scalar.list.rule';
import { operatorRules } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/operator.list.rule';
import { delimiterRules } from '@grammar/ast/nodes/atoms/operators/delimiters/_abstract/_list/delimiter.list.rule';

const nodeRules = [
  nodeRule,
  ...scalarRules,
  ...operatorRules,
  ...delimiterRules,
  ...containerNodeRules,
];
export default nodeRules;
