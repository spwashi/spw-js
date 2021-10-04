import { PostfixedReductionExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { reductionExpressions } from '../../../../_abstract/_list/refs';
import { infixedReductionExpression } from '../../../infix/ref';
import { prefixedReductionExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedReductionExpression.components.head.name,
  pattern: anyOf([
    infixedReductionExpression,
    prefixedReductionExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !reductionExpressions.includes(i)),
    node,
  ]),
};
