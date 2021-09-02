import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { NodeDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/node/construct';

export const operatorDelimitingOperatorRule = getOperatorRule(NodeDelimitingOperator);
