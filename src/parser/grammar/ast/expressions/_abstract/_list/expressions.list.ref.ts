import { infixExpression } from '@grammar/ast/expressions/infix/_abstract/infix.ref';
import { sequenceExpression } from '@grammar/ast/expressions/sequence/_abstract/sequence.ref';

export const expressions = [
  infixExpression,
  sequenceExpression,
  // prefixExpression,
  // postfixExpression,
];
