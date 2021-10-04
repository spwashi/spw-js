import { postfixedAggregationExpression } from '@grammar/ast/expressions/operations/aggregation/_variants/postfix/ref';
import { postfixedBindingExpression } from '@grammar/ast/expressions/operations/binding/_variants/postfix/ref';
import { postfixedRangeExpression } from '@grammar/ast/expressions/operations/range/_variants/postfix/ref';
import { postfixedReductionExpression } from '@grammar/ast/expressions/operations/reduction/_variants/postfix/ref';
import { postfixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/postfix/ref';

export const postfixedOperations = [
  postfixedAggregationExpression,
  postfixedBindingExpression,
  postfixedRangeExpression,
  postfixedReductionExpression,
  postfixedTransformationExpression,
];
