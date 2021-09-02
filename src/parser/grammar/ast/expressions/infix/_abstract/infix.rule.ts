import { ruleName } from './infix.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { infixExpressions } from '@grammar/ast/expressions/infix/_abstract/_list/infix.list.ref';

const name = ruleName;
const pattern = anyOf(infixExpressions);

export const infixExpressionRule = new Rule(name, pattern);
