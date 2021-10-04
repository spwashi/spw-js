import { PostfixedPerspectiveExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { perspectiveExpressions } from '../../../../_abstract/_list/refs';
import { infixedPerspectiveExpression } from '../../../infix/ref';
import { prefixedPerspectiveExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedPerspectiveExpression.components.head.name,
  pattern: anyOf([
    infixedPerspectiveExpression,
    prefixedPerspectiveExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !perspectiveExpressions.includes(i)),
    node,
  ]),
};
