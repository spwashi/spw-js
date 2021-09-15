import { strandExpressionRule } from '@grammar/ast/expressions/infix/strand/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infix/phrase/rule';
import { infixExpressionRule } from '@grammar/ast/expressions/infix/_abstract/infix.rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infix/common/rule';
import { infixOperationRules } from '@grammar/ast/expressions/infix/_abstract/_list/operations/infix.operations.list.rule';

export const infixExpressionRules = [
  strandExpressionRule,
  commonExpressionRule,
  phraseExpressionRule,
  ...infixOperationRules,
  infixExpressionRule,
];
