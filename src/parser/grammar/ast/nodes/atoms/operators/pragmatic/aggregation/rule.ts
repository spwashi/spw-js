// rules
import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { AggregationOperator } from '@constructs/ast';

export const aggregationOperatorRule = getOperatorRule(AggregationOperator);
