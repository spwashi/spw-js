import { prefixedExpressions } from '@grammar/ast/expressions/prefixed/_abstract/_list/prefix.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './prefix.ref';

const pattern = anyOf(prefixedExpressions);
export const prefixedExpressionRule = new Rule(ruleName, pattern);
