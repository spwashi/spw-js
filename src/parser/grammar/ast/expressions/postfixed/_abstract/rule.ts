import { postfixedExpressions } from '@grammar/ast/expressions/postfixed/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const pattern = anyOf(postfixedExpressions);
export const postfixedExpressionRule = new Rule(ruleName, pattern);
