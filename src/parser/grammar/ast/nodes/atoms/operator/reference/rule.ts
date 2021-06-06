import { getOperatorRule } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { ReferenceOperator } from '@constructs/ast';

export const referenceOperatorRule = getOperatorRule(ReferenceOperator);
