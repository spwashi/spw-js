import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/pragmatic/_abstract/_list/refs';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './operator.ref';

export const operatorRule = new Rule(ruleName, anyOf(pragmaticOperators));
