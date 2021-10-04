import { PostfixedEvaluationExpression } from '@constructs/ast';
import { expressions } from '@grammar/ast/expressions/_abstract/_list/refs';
import { postfixedOperations } from '@grammar/ast/expressions/operations/_abstract/postfix/_list/refs';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { evaluationExpressions } from '../../../../_abstract/_list/refs';
import { infixedEvaluationExpression } from '../../../infix/ref';
import { prefixedEvaluationExpression } from '../../../prefix/ref';

export const headComponent = {
  name: PostfixedEvaluationExpression.components.head.name,
  pattern: anyOf([
    infixedEvaluationExpression,
    prefixedEvaluationExpression,
    ...expressions
      .filter((i) => ![...postfixedOperations].includes(i))
      .filter((i) => !evaluationExpressions.includes(i)),
    node,
  ]),
};
