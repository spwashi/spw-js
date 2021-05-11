import {getOperatorRule} from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import {BranchOperator} from '@constructs/ast';

export const branchOperatorRule = getOperatorRule(BranchOperator);