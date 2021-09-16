import { infixOperations } from '@grammar/ast/expressions/infix/_abstract/_list/operations/infix.operations.list.ref';
import { commonExpression } from '@grammar/ast/expressions/infix/common/ref';
import { phraseExpression } from '@grammar/ast/expressions/infix/phrase/ref';
import { strandExpression } from '@grammar/ast/expressions/infix/strand/ref';

export const infixExpressions = [
  strandExpression,
  commonExpression,
  phraseExpression,
  ...infixOperations,
];
