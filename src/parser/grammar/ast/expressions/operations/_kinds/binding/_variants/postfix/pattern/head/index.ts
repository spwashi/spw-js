import { PostfixedBindingExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { bindingExpressions } from '../../../../_abstract/_list/refs';
import { infixedBindingExpression } from '../../../infix/ref';
import { prefixedBindingExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedBindingExpression.components.head.name,
  pattern: anyOf([
    infixedBindingExpression,
    prefixedBindingExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !bindingExpressions.includes(i)),
    node,
  ]),
};
