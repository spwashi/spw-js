import { getOperatorReference } from '@grammar/ast/nodes/atoms/operator/_util/operator.rule.init';
import { EvaluationOperator } from '@constructs/ast';

export const evaluationOperator = getOperatorReference(EvaluationOperator);
