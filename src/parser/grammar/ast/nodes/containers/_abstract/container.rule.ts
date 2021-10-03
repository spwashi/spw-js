import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { containerNodes } from './_list/refs';
import { ruleName } from './container.ref';

export const containerNodeRule = new Rule(ruleName, anyOf(containerNodes));
