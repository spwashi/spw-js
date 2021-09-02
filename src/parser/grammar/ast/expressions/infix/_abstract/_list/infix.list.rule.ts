import { strandExpressionRule } from '@grammar/ast/expressions/infix/strand/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infix/phrase/rule';
import { infixExpressionRule } from '@grammar/ast/expressions/infix/_abstract/infix.rule';

export const infixExpressionRules = [
  strandExpressionRule,
  phraseExpressionRule,
  infixExpressionRule,
];
