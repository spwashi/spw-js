import { commonExpression } from '@grammar/ast/expressions/infixed/common/ref';
import { phraseExpression } from '@grammar/ast/expressions/infixed/phrase/ref';
import { infixedOperations } from '@grammar/ast/expressions/operations/_abstract/infix/_list/infix.operations.list.ref';

export const infixedExpressions = [commonExpression, phraseExpression, ...infixedOperations];
