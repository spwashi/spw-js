import { nodeRule } from '@grammar/ast/nodes/_abstract/node.rule';
import { operatorRules } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/rules';
import { delimiterRules } from '@grammar/ast/nodes/atoms/operators/delimiters/_abstract/_list/rules';
import { scalarRules } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/rules';
import { containerNodeRules } from '@grammar/ast/nodes/containers/_abstract/_list/rules';
import { Rule } from '@spwashi/language/parsers/grammar';

const nodeRules: Rule[] = [
  nodeRule,
  ...scalarRules,
  ...operatorRules,
  ...delimiterRules,
  ...containerNodeRules,
];
export default nodeRules;
