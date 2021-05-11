import {ruleName} from './operator.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {operators} from '@grammar/ast/nodes/atoms/operator/_abstract/_list/operator.list.ref';
import {anyOf} from '@spwashi/language/parsers/grammar/combinators';

export const operatorRule = new Rule(ruleName, anyOf(operators));