import { ConvergenceOperator } from '@constructs/ast';
import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const convergenceOperatorRule = getOperatorRule(ConvergenceOperator);
