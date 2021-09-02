import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './sequence.ref';
import { sequenceExpressions } from '@grammar/ast/expressions/sequence/_abstract/_list/sequences.list.ref';

export const sequenceExpressionRule = new Rule(ruleName, anyOf(sequenceExpressions));
