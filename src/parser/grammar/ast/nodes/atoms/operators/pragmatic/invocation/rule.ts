import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { InvocationOperator } from '@constructs/ast';

export const invocationOperatorRule = getOperatorRule(InvocationOperator);
