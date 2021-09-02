import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { PerformanceOperator } from '@constructs/ast';

export const performanceOperatorRule = getOperatorRule(PerformanceOperator);
