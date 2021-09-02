import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { CommonDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/common/construct';

export const commonDelimitingOperatorRule = getOperatorRule(CommonDelimitingOperator);
