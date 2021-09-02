import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { BlockDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/block/construct';

export const blockDelimitingOperator = getOperatorReference(BlockDelimitingOperator);
