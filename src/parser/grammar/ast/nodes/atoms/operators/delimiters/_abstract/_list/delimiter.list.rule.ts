import { blockDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operators/delimiters/block/rule';
import { commonDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operators/delimiters/common/rule';
import { operatorDelimitingOperatorRule } from '@grammar/ast/nodes/atoms/operators/delimiters/operator/rule';

export const delimiterRules = [
  blockDelimitingOperatorRule,
  commonDelimitingOperatorRule,
  operatorDelimitingOperatorRule,
];
