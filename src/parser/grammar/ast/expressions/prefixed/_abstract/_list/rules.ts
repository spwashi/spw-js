import { prefixedOperationRules } from '@grammar/ast/expressions/operations/_abstract/prefix/_list/rules';
import { prefixedExpressionRule } from '@grammar/ast/expressions/prefixed/_abstract/rule';

export const prefixExpressionRules = [...prefixedOperationRules, prefixedExpressionRule];
