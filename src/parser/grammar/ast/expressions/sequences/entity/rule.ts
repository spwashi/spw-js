import { pattern } from '@grammar/ast/expressions/sequences/entity/pattern';
import { Rule } from '@spwashi/language/parsers/grammar';
import { ruleName } from './ref';

export const entityExpressionRule = new Rule(ruleName, pattern);
