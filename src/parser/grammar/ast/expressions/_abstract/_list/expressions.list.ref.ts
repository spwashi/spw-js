import { infixedExpressions } from '@grammar/ast/expressions/infixed/_abstract/_list/infix.list.ref';
import { infixedExpression } from '@grammar/ast/expressions/infixed/_abstract/infix.ref';
import { prefixedExpressions } from '@grammar/ast/expressions/prefixed/_abstract/_list/prefix.list.ref';
import { prefixedExpression } from '@grammar/ast/expressions/prefixed/_abstract/prefix.ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.ref';
import { sequenceExpression } from '@grammar/ast/expressions/sequences/_abstract/sequence.ref';

export const expressionGroups = [prefixedExpression, infixedExpression, sequenceExpression];

export const expressions = [...sequenceExpressions, ...infixedExpressions, ...prefixedExpressions];
