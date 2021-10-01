import { infixedExpressionRule } from '@grammar/ast/expressions/infixed/_abstract/infix.rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infixed/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infixed/phrase/rule';
import { infixedOperationRules } from '@grammar/ast/expressions/operations/_abstract/infix/_list/infix.operations.list.rule';

export const infixedExpressionRules = [
  infixedExpressionRule,
  commonExpressionRule,
  phraseExpressionRule,
  ...infixedOperationRules,
];
