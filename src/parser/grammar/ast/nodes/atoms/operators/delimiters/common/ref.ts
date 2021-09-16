import { CommonDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/common/construct';
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const commonDelimitingOperator = getOperatorReference(CommonDelimitingOperator);
