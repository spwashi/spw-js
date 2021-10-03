import { commonExpression } from '@grammar/ast/expressions/infixed/common/ref';
import { phraseExpression } from '@grammar/ast/expressions/infixed/phrase/ref';
import { infixedOperations } from '@grammar/ast/expressions/operations/_abstract/infix/_list/refs';

export const infixedExpressions = [...infixedOperations, commonExpression, phraseExpression];
