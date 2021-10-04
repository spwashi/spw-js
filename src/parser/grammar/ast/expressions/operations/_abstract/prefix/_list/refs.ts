import { prefixedAggregationExpression } from '@grammar/ast/expressions/operations/_kinds/aggregation/_variants/prefix/ref';
import { prefixedBindingExpression } from '@grammar/ast/expressions/operations/_kinds/binding/_variants/prefix/ref';
import { prefixedChannelExpression } from '@grammar/ast/expressions/operations/_kinds/channel/_variants/prefix/ref';
import { prefixedEvaluationExpression } from '@grammar/ast/expressions/operations/_kinds/evaluation/_variants/prefix/ref';
import { prefixedInvocationExpression } from '@grammar/ast/expressions/operations/_kinds/invocation/_variants/prefix/ref';
import { prefixedPerformanceExpression } from '@grammar/ast/expressions/operations/_kinds/performance/_variants/prefix/ref';
import { prefixedPerspectiveExpression } from '@grammar/ast/expressions/operations/_kinds/perspective/_variants/prefix/ref';
import { prefixedRangeExpression } from '@grammar/ast/expressions/operations/_kinds/range/_variants/prefix/ref';
import { prefixedReductionExpression } from '@grammar/ast/expressions/operations/_kinds/reduction/_variants/prefix/ref';
import { prefixedTransformationExpression } from '@grammar/ast/expressions/operations/_kinds/transformation/_variants/prefix/ref';

export const prefixedOperations = [
  prefixedAggregationExpression,
  prefixedBindingExpression,
  prefixedRangeExpression,
  prefixedReductionExpression,
  prefixedTransformationExpression,
  prefixedChannelExpression,
  prefixedInvocationExpression,
  prefixedEvaluationExpression,
  prefixedPerformanceExpression,
  prefixedPerspectiveExpression,
];
