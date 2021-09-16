import { BlockDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/block/construct';
import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const blockDelimitingOperatorRule = getOperatorRule(BlockDelimitingOperator);
