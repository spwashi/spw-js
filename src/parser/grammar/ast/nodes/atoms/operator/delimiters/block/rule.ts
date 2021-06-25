import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/atoms/operators/delimiters/block/construct';

export const blockDelimitingOperatorRule = getOperatorRule(
  BlockDelimitingOperator,
);
