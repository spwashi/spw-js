// rules
import {getOperatorRule} from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import {AggregationOperator} from '@constructs/ast';

export const aggregationOperatorRule = getOperatorRule(AggregationOperator);