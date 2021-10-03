import { PostfixedTransformationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { transformationExpressions } from '../../../../_abstract/_list/refs';
import { infixedTransformationExpression } from '../../../infix/ref';
import { prefixedTransformationExpression } from '../../../prefix/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const headComponent = {
  name: PostfixedTransformationExpression.components.head.name,
  pattern: anyOf([
    infixedTransformationExpression,
    prefixedTransformationExpression,
    ...expressions.filter((i) => !transformationExpressions.includes(i)),
    node,
  ]),
};
