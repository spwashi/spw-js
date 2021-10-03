import { scalars } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './scalar.ref';

export const scalarRule = new Rule(ruleName, anyOf(scalars));
