import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { PerformanceOperator } from '@constructs/ast';

export const performanceOperatorRule = getOperatorRule(PerformanceOperator);
