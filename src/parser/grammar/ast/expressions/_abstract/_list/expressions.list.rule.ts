import { infixExpressionRules } from '@grammar/ast/expressions/infix/_abstract/_list/infix.list.rule';
import { sequenceExpressionRules } from '@grammar/ast/expressions/sequence/_abstract/_list/sequences.list.rule';
import { Rule } from '@spwashi/language/parsers/grammar';
import { postfixExpressionRule } from '../../postfix/_abstract/postfix.rule';
import { prefixExpressionRule } from '../../prefix/_abstract/prefix.rule';
import { expressionRule } from '../expression.rule';

export const expressionRules: Rule[] = [
  expressionRule,
  ...sequenceExpressionRules,
  ...infixExpressionRules,
  prefixExpressionRule,
  postfixExpressionRule,
];
