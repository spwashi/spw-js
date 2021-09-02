import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { TransformationOperator } from '@constructs/ast';

export const transformationOperatorRule = getOperatorRule(TransformationOperator);
