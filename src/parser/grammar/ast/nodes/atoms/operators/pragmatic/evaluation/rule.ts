import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';
import { EvaluationOperator } from '@constructs/ast';

export const evaluationOperatorRule = getOperatorRule(EvaluationOperator);
