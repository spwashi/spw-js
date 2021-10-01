import { infixedExpressions } from '@grammar/ast/expressions/infixed/_abstract/_list/infix.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './infix.ref';

const pattern = anyOf(infixedExpressions);
export const infixedExpressionRule = new Rule(ruleName, pattern);
