import { postfixedOperationRules } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/rules';
import { postfixedExpressionRule } from '@grammar/ast/expressions/postfixed/_abstract/rule';

export const postfixExpressionRules = [...postfixedOperationRules, postfixedExpressionRule];
