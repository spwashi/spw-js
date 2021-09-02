import { getOperatorReference } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { BranchOperator } from '@constructs/ast';

export const branchOperator = getOperatorReference(BranchOperator);
