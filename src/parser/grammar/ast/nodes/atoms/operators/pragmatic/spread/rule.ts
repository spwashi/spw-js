import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { SpreadOperator } from '@constructs/ast';

export const spreadOperatorRule = getOperatorRule(SpreadOperator);
