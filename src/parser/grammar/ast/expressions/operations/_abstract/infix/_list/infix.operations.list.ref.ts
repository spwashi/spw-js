import { infixedAggregationExpression } from '@grammar/ast/expressions/operations/aggregation/_variants/infix/ref';
import { infixedBindingExpression } from '@grammar/ast/expressions/operations/binding/_variants/infix/ref';
import { infixedRangeExpression } from '@grammar/ast/expressions/operations/range/_variants/infix/ref';
import { infixedReductionExpression } from '@grammar/ast/expressions/operations/reduction/_variants/infix/ref';
import { infixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/infix/ref';

export const infixedOperations = [
  infixedBindingExpression,
  infixedTransformationExpression,
  infixedAggregationExpression,
  infixedReductionExpression,
  infixedRangeExpression,
];
