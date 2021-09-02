import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { RangeOperator } from '@constructs/ast';

export const rangeOperatorRule = getOperatorRule(RangeOperator);
