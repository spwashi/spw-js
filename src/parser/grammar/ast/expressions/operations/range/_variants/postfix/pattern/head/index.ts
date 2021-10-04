import { PostfixedRangeExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { rangeExpressions } from '../../../../_abstract/_list/refs';
import { infixedRangeExpression } from '../../../infix/ref';
import { prefixedRangeExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedRangeExpression.components.head.name,
  pattern: anyOf([
    infixedRangeExpression,
    prefixedRangeExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !rangeExpressions.includes(i)),
    node,
  ]),
};
