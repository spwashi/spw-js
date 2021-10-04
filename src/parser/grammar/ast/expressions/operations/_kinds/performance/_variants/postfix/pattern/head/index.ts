import { PostfixedPerformanceExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { performanceExpressions } from '../../../../_abstract/_list/refs';
import { infixedPerformanceExpression } from '../../../infix/ref';
import { prefixedPerformanceExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedPerformanceExpression.components.head.name,
  pattern: anyOf([
    infixedPerformanceExpression,
    prefixedPerformanceExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !performanceExpressions.includes(i)),
    node,
  ]),
};
