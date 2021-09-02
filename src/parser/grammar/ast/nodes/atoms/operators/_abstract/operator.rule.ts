import { ruleName } from './operator.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/operator.list.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const operatorRule = new Rule(ruleName, anyOf(pragmaticOperators));
