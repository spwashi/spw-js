import { PostfixedInvocationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { invocationExpressions } from '../../../../_abstract/_list/refs';
import { infixedInvocationExpression } from '../../../infix/ref';
import { prefixedInvocationExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedInvocationExpression.components.head.name,
  pattern: anyOf([
    infixedInvocationExpression,
    prefixedInvocationExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !invocationExpressions.includes(i)),
    node,
  ]),
};
