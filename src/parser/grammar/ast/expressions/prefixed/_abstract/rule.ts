import { prefixedExpressions } from '@grammar/ast/expressions/prefixed/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const pattern = anyOf(prefixedExpressions);
export const prefixedExpressionRule = new Rule(ruleName, pattern);
