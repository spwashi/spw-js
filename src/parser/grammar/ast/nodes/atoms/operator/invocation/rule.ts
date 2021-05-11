import {getOperatorRule} from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import {InvocationOperator} from '@constructs/ast';

export const invocationOperatorRule = getOperatorRule(InvocationOperator);