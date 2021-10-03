import { infixedExpressionRule } from '@grammar/ast/expressions/infixed/_abstract/rule';
import { commonExpressionRule } from '@grammar/ast/expressions/infixed/common/rule';
import { phraseExpressionRule } from '@grammar/ast/expressions/infixed/phrase/rule';
import { infixedOperationRules } from '@grammar/ast/expressions/operations/_abstract/infix/_list/rules';

export const infixedExpressionRules = [
  infixedExpressionRule,
  commonExpressionRule,
  phraseExpressionRule,
  ...infixedOperationRules,
];
