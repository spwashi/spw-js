import { aggregationExpressionRule } from '@grammar/ast/expressions/infix/operations/aggregation/rule';
import { reductionExpressionRule } from '@grammar/ast/expressions/infix/operations/reduction/rule';

export const infixOperationRules = [aggregationExpressionRule, reductionExpressionRule];
