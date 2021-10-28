import { NodeDelimiter } from '@constructs/ast/nodes/operators/semantic/node_delimiter/construct';
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const nodeDelimiter = getOperatorReference(NodeDelimiter);
