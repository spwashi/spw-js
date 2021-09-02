import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { ReductionOperator } from '@constructs/ast';

export const reductionOperatorRule = getOperatorRule(ReductionOperator);
