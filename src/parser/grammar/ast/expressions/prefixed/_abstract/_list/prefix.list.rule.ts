import { prefixedOperationRules } from '@grammar/ast/expressions/operations/_abstract/prefix/_list/prefix.operations.list.rule';
import { prefixedExpressionRule } from '@grammar/ast/expressions/prefixed/_abstract/prefix.rule';

export const prefixExpressionRules = [...prefixedOperationRules, prefixedExpressionRule];
