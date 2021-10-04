import { infixedAggregationExpression } from '@grammar/ast/expressions/operations/_kinds/aggregation/_variants/infix/ref';
import { infixedBindingExpression } from '@grammar/ast/expressions/operations/_kinds/binding/_variants/infix/ref';
import { infixedChannelExpression } from '@grammar/ast/expressions/operations/_kinds/channel/_variants/infix/ref';
import { infixedEvaluationExpression } from '@grammar/ast/expressions/operations/_kinds/evaluation/_variants/infix/ref';
import { infixedInvocationExpression } from '@grammar/ast/expressions/operations/_kinds/invocation/_variants/infix/ref';
import { infixedPerformanceExpression } from '@grammar/ast/expressions/operations/_kinds/performance/_variants/infix/ref';
import { infixedPerspectiveExpression } from '@grammar/ast/expressions/operations/_kinds/perspective/_variants/infix/ref';
import { infixedRangeExpression } from '@grammar/ast/expressions/operations/_kinds/range/_variants/infix/ref';
import { infixedReductionExpression } from '@grammar/ast/expressions/operations/_kinds/reduction/_variants/infix/ref';
import { infixedTransformationExpression } from '@grammar/ast/expressions/operations/_kinds/transformation/_variants/infix/ref';

export const infixedOperations = [
  infixedBindingExpression,
  infixedTransformationExpression,
  infixedAggregationExpression,
  infixedChannelExpression,
  infixedEvaluationExpression,
  infixedInvocationExpression,
  infixedPerformanceExpression,
  infixedPerspectiveExpression,
  infixedRangeExpression,
  infixedReductionExpression,
];
