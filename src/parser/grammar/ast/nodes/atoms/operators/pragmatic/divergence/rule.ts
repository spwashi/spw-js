import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { DivergenceOperator } from '@constructs/ast';

export const divergenceOperatorRule = getOperatorRule(DivergenceOperator);
