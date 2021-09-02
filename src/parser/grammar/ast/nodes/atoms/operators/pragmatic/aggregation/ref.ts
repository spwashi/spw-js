// references
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { AggregationOperator } from '@constructs/ast';

export const aggregationOperator = getOperatorReference(AggregationOperator);
