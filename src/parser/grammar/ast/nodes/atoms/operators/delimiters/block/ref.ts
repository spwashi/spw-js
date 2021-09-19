import { BlockDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/block/construct';
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const blockDelimitingOperator = getOperatorReference(BlockDelimitingOperator);