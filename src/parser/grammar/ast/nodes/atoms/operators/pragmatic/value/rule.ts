import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { ValueOperator } from '@constructs/ast';

export const valueOperatorRule = getOperatorRule(ValueOperator);
