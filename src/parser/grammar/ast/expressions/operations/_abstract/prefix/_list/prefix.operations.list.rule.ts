import { prefixedAggregationExpressionRule } from '@grammar/ast/expressions/operations/aggregation/_variants/prefix/rule';
import { prefixedBindingExpressionRule } from '@grammar/ast/expressions/operations/binding/_variants/prefix/rule';
import { prefixedRangeExpressionRule } from '@grammar/ast/expressions/operations/range/_variants/prefix/rule';
import { prefixedReductionExpressionRule } from '@grammar/ast/expressions/operations/reduction/_variants/prefix/rule';
import { prefixedTransformationExpressionRule } from '@grammar/ast/expressions/operations/transformation/_variants/prefix/rule';

export const prefixedOperationRules = [
  prefixedAggregationExpressionRule,
  prefixedBindingExpressionRule,
  prefixedRangeExpressionRule,
  prefixedReductionExpressionRule,
  prefixedTransformationExpressionRule,
];
