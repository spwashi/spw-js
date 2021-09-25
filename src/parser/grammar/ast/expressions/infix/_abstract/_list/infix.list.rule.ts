import { infixOperationRules } from '@grammar/ast/expressions/infix/_abstract/_list/operations/infix.operations.list.rule';
import { infixExpressionRule } from '@grammar/ast/expressions/infix/_abstract/infix.rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infix/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infix/phrase/rule';

export const infixExpressionRules = [
  commonExpressionRule,
  phraseExpressionRule,
  ...infixOperationRules,
  infixExpressionRule,
];
