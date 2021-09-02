import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { containers } from './_list/container.list.ref';
import { ruleName } from './container.ref';

export const containerNodeRule = new Rule(ruleName, anyOf(containers));
