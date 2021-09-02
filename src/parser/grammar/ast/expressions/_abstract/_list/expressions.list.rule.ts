import { expressionRule } from '../expression.rule';
import { prefixExpressionRule } from '../../prefix/_abstract/prefix.rule';
import { postfixExpressionRule } from '../../postfix/_abstract/postfix.rule';
import { sequenceExpressionRules } from '@grammar/ast/expressions/sequence/_abstract/_list/sequences.list.rule';
import { infixExpressionRules } from '@grammar/ast/expressions/infix/_abstract/_list/infix.list.rule';

export const expressionRules = [
  expressionRule,
  ...sequenceExpressionRules,
  ...infixExpressionRules,
  prefixExpressionRule,
  postfixExpressionRule,
];
