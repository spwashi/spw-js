import { ruleName } from './ref';
import { semanticOperators } from '@grammar/ast/nodes/atoms/operators/delimiters/_abstract/_list/delimiter.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const delimiterRule = new Rule(ruleName, anyOf(semanticOperators));
