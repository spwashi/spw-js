import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/common/construct';

export const commonDelimitingOperatorRule = getOperatorRule(
  CommonDelimitingOperator,
);
