import { Rule } from '@spwashi/language/parsers/grammar';
import { pattern } from './pattern';
import { ruleName } from './ref';

export const prefixedBindingExpressionRule = new Rule(ruleName, pattern);
