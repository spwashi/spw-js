import { infixedExpressionRules } from '@grammar/ast/expressions/infixed/_abstract/_list/infix.list.rule';
import { prefixExpressionRules } from '@grammar/ast/expressions/prefixed/_abstract/_list/prefix.list.rule';
import { sequenceExpressionRules } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.rule';
import { Rule } from '@spwashi/language/parsers/grammar';
import { expressionRule } from '../expression.rule';

export const expressionRules: Rule[] = [
  expressionRule,
  ...sequenceExpressionRules,
  ...infixedExpressionRules,
  ...prefixExpressionRules,
];
