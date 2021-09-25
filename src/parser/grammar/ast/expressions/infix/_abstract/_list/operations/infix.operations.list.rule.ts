import { aggregationExpressionRule } from '@grammar/ast/expressions/infix/operations/aggregation/rule';
import { bindingExpressionRule } from '@grammar/ast/expressions/infix/operations/binding/rule';
import { rangeExpressionRule } from '@grammar/ast/expressions/infix/operations/range/rule';
import { reductionExpressionRule } from '@grammar/ast/expressions/infix/operations/reduction/rule';
import { transformationExpressionRule } from '@grammar/ast/expressions/infix/operations/transformation/rule';

export const infixOperationRules = [
  aggregationExpressionRule,
  bindingExpressionRule,
  reductionExpressionRule,
  transformationExpressionRule,
  rangeExpressionRule,
];
