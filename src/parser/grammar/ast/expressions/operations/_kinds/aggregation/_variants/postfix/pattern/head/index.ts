import { PostfixedAggregationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { aggregationExpressions } from '../../../../_abstract/_list/refs';
import { infixedAggregationExpression } from '../../../infix/ref';
import { prefixedAggregationExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedAggregationExpression.components.head.name,
  pattern: anyOf([
    infixedAggregationExpression,
    prefixedAggregationExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !aggregationExpressions.includes(i)),
    node,
  ]),
};
