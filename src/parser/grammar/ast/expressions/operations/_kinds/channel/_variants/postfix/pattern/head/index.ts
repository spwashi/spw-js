import { PostfixedChannelExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { channelExpressions } from '../../../../_abstract/_list/refs';
import { infixedChannelExpression } from '../../../infix/ref';
import { prefixedChannelExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedChannelExpression.components.head.name,
  pattern: anyOf([
    infixedChannelExpression,
    prefixedChannelExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !channelExpressions.includes(i)),
    node,
  ]),
};
