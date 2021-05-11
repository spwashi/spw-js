import {getOperatorRule} from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import {SpreadOperator} from '@constructs/ast';

export const spreadOperatorRule = getOperatorRule(SpreadOperator);