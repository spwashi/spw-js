import { prefixedAggregationExpression } from '@grammar/ast/expressions/operations/aggregation/_variants/prefix/ref';
import { prefixedBindingExpression } from '@grammar/ast/expressions/operations/binding/_variants/prefix/ref';
import { prefixedRangeExpression } from '@grammar/ast/expressions/operations/range/_variants/prefix/ref';
import { prefixedReductionExpression } from '@grammar/ast/expressions/operations/reduction/_variants/prefix/ref';
import { prefixedTransformationExpression } from '@grammar/ast/expressions/operations/transformation/_variants/prefix/ref';

export const prefixedOperations = [
  prefixedAggregationExpression,
  prefixedBindingExpression,
  prefixedRangeExpression,
  prefixedReductionExpression,
  prefixedTransformationExpression,
];
