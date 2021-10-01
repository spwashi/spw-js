import { infixedAggregationExpressionRule } from '@grammar/ast/expressions/operations/aggregation/_variants/infix/rule';
import { infixedBindingExpressionRule } from '@grammar/ast/expressions/operations/binding/_variants/infix/rule';
import { infixedRangeExpressionRule } from '@grammar/ast/expressions/operations/range/_variants/infix/rule';
import { infixedReductionExpressionRule } from '@grammar/ast/expressions/operations/reduction/_variants/infix/rule';
import { infixedTransformationExpressionRule } from '@grammar/ast/expressions/operations/transformation/_variants/infix/rule';

export const infixedOperationRules = [
  infixedAggregationExpressionRule,
  infixedBindingExpressionRule,
  infixedReductionExpressionRule,
  infixedTransformationExpressionRule,
  infixedRangeExpressionRule,
];
