import { semanticOperators } from '@grammar/ast/nodes/atoms/operators/semantic/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

export const delimiterRule = new Rule(ruleName, anyOf(semanticOperators));
