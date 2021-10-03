import { infixedExpressions } from '@grammar/ast/expressions/infixed/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const pattern = anyOf(infixedExpressions);
export const infixedExpressionRule = new Rule(ruleName, pattern);
