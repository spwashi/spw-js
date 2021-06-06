import { getOperatorReference } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { ReductionOperator } from '@constructs/ast';

export const reductionOperator = getOperatorReference(ReductionOperator);
