import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { ValueOperator } from '@constructs/ast';

export const valueOperatorRule = getOperatorRule(ValueOperator);
