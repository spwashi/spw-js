import { Rule } from '@spwashi/language/parsers/grammar';
import { pattern } from './pattern';
import { ruleName } from './ref';

export const postfixedPerformanceExpressionRule = new Rule(ruleName, pattern);
