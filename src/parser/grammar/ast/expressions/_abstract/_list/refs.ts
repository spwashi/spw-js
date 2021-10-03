import { infixedExpressions } from '@grammar/ast/expressions/infixed/_abstract/_list/refs';
import { infixedExpression } from '@grammar/ast/expressions/infixed/_abstract/ref';
import { postfixedExpressions } from '@grammar/ast/expressions/postfixed/_abstract/_list/refs';
import { postfixedExpression } from '@grammar/ast/expressions/postfixed/_abstract/ref';
import { prefixedExpressions } from '@grammar/ast/expressions/prefixed/_abstract/_list/refs';
import { prefixedExpression } from '@grammar/ast/expressions/prefixed/_abstract/ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/refs';
import { sequenceExpression } from '@grammar/ast/expressions/sequences/_abstract/ref';

export const expressionGroups = [
  postfixedExpression,
  prefixedExpression,
  infixedExpression,
  sequenceExpression,
];

export const expressions = [
  ...postfixedExpressions,
  ...sequenceExpressions,
  ...infixedExpressions,
  ...prefixedExpressions,
];
