import {getOperatorRule} from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import {ReductionOperator} from '@constructs/ast';

export const reductionOperatorRule = getOperatorRule(ReductionOperator);