import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { RangeOperator } from '@constructs/ast';

export const rangeOperatorRule = getOperatorRule(RangeOperator);
