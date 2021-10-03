import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { nodes } from './_list/refs';
import { ruleName } from './node.ref';

// A self-contained unit of description.
export const nodeRule = new Rule(ruleName, anyOf(nodes));
