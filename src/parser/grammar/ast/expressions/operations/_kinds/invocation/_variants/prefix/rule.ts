import { Rule } from '@spwashi/language/parsers/grammar';
import { pattern } from './pattern';
import { ruleName } from './ref';

export const prefixedInvocationExpressionRule = new Rule(ruleName, pattern);
