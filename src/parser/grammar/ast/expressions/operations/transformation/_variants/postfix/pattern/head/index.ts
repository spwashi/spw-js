import { PostfixedTransformationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { transformationExpressions } from '../../../../_abstract/_list/refs';
import { infixedTransformationExpression } from '../../../infix/ref';
import { prefixedTransformationExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedTransformationExpression.components.head.name,
  pattern: anyOf([
    infixedTransformationExpression,
    prefixedTransformationExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !transformationExpressions.includes(i)),
    node,
  ]),
};
