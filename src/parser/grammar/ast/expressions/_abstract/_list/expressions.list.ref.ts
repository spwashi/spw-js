import { infixExpression } from '@grammar/ast/expressions/infix/_abstract/infix.ref';
import { prefixExpression } from '@grammar/ast/expressions/prefix/_abstract/prefix.ref';
import { postfixExpression } from '@grammar/ast/expressions/postfix/_abstract/postfix.ref';
import { sequenceExpression } from '@grammar/ast/expressions/sequence/_abstract/sequence.ref';

export const expressions = [
  sequenceExpression,
  prefixExpression,
  infixExpression,
  postfixExpression,
];
