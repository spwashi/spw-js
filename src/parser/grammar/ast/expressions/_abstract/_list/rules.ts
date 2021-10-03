import { infixedExpressionRules } from '@grammar/ast/expressions/infixed/_abstract/_list/rules';
import { postfixExpressionRules } from '@grammar/ast/expressions/postfixed/_abstract/_list/rules';
import { prefixExpressionRules } from '@grammar/ast/expressions/prefixed/_abstract/_list/rules';
import { sequenceExpressionRules } from '@grammar/ast/expressions/sequences/_abstract/_list/rules';
import { Rule } from '@spwashi/language/parsers/grammar';
import { expressionRule } from '../expression.rule';

export const expressionRules: Rule[] = [
  expressionRule,
  ...sequenceExpressionRules,
  ...postfixExpressionRules,
  ...infixedExpressionRules,
  ...prefixExpressionRules,
];
