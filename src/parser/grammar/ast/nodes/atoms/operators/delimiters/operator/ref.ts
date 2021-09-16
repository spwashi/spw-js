import { NodeDelimitingOperator } from '@constructs/ast/nodes/operators/semantic/node/construct';
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const nodeDelimiter = getOperatorReference(NodeDelimitingOperator);
