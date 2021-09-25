import { aggregationExpression } from '@grammar/ast/expressions/infix/operations/aggregation/ref';
import { bindingExpression } from '@grammar/ast/expressions/infix/operations/binding/ref';
import { rangeExpression } from '@grammar/ast/expressions/infix/operations/range/ref';
import { reductionExpression } from '@grammar/ast/expressions/infix/operations/reduction/ref';
import { transformationExpression } from '@grammar/ast/expressions/infix/operations/transformation/ref';

export const infixOperations = [
  bindingExpression,
  transformationExpression,
  aggregationExpression,
  reductionExpression,
  rangeExpression,
];
