import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/operator.list.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './operator.ref';

export const operatorRule = new Rule(ruleName, anyOf(pragmaticOperators));
