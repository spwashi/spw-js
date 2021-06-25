import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { OperatorDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/operator/construct';

export const operatorDelimitingOperatorRule = getOperatorRule(
  OperatorDelimitingOperator,
);
