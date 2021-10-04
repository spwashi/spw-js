import { Rule } from '@spwashi/language/parsers/grammar';
import { pattern } from './pattern';
import { ruleName } from './ref';

export const prefixedPerspectiveExpressionRule = new Rule(ruleName, pattern);
