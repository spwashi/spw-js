import { sequenceExpressions } from '@grammar/ast/expressions/sequences/_abstract/_list/sequences.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './sequence.ref';

export const sequenceExpressionRule = new Rule(ruleName, anyOf(sequenceExpressions));
