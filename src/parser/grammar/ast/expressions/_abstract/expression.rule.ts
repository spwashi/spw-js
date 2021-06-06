import { Rule } from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './expression.ref';
import { expressions } from './_list/expressions.list.ref';

export const expressionRule = new Rule(
  ruleName,
  combinators.anyOf(expressions),
);
