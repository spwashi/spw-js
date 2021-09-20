import { aggregationExpression } from '@grammar/ast/expressions/infix/operations/aggregation/ref';
import { reductionExpression } from '@grammar/ast/expressions/infix/operations/reduction/ref';

export const infixOperations = [aggregationExpression, reductionExpression];
