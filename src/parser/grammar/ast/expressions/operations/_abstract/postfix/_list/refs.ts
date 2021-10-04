import { postfixedAggregationExpression } from '@grammar/ast/expressions/operations/_kinds/aggregation/_variants/postfix/ref';
import { postfixedBindingExpression } from '@grammar/ast/expressions/operations/_kinds/binding/_variants/postfix/ref';
import { postfixedChannelExpression } from '@grammar/ast/expressions/operations/_kinds/channel/_variants/postfix/ref';
import { postfixedEvaluationExpression } from '@grammar/ast/expressions/operations/_kinds/evaluation/_variants/postfix/ref';
import { postfixedInvocationExpression } from '@grammar/ast/expressions/operations/_kinds/invocation/_variants/postfix/ref';
import { postfixedPerformanceExpression } from '@grammar/ast/expressions/operations/_kinds/performance/_variants/postfix/ref';
import { postfixedPerspectiveExpression } from '@grammar/ast/expressions/operations/_kinds/perspective/_variants/postfix/ref';
import { postfixedRangeExpression } from '@grammar/ast/expressions/operations/_kinds/range/_variants/postfix/ref';
import { postfixedReductionExpression } from '@grammar/ast/expressions/operations/_kinds/reduction/_variants/postfix/ref';
import { postfixedTransformationExpression } from '@grammar/ast/expressions/operations/_kinds/transformation/_variants/postfix/ref';

export const postfixedOperations = [
  postfixedAggregationExpression,
  postfixedBindingExpression,
  postfixedChannelExpression,
  postfixedEvaluationExpression,
  postfixedInvocationExpression,
  postfixedPerformanceExpression,
  postfixedPerspectiveExpression,
  postfixedRangeExpression,
  postfixedReductionExpression,
  postfixedTransformationExpression,
];
