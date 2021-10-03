import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

export const sequenceExpressionRule = new Rule(ruleName, anyOf(sequenceExpressions));
