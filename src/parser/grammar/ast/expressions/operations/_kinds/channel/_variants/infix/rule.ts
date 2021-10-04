import { Rule } from '@spwashi/language/parsers/grammar';
import { pattern } from './pattern';
import { actionString } from './pattern/actionString';
import { ruleName } from './ref';

export const infixedChannelExpressionRule = new Rule(ruleName, pattern, actionString);
