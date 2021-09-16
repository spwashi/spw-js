import { infixExpressions } from '@grammar/ast/expressions/infix/_abstract/_list/infix.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './infix.ref';

const pattern = anyOf(infixExpressions);

export const infixExpressionRule = new Rule(ruleName, pattern);
