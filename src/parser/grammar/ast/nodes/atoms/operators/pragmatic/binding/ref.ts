// references
import { BindingOperator } from '@constructs/ast';
import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const bindingOperator = getOperatorReference(BindingOperator);
