import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { expressions } from './_list/expressions.list.ref';
import { ruleName } from './expression.ref';

export const expressionRule = new Rule(ruleName, anyOf(expressions));
