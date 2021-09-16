import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { nodes } from './_list/node.list.ref';
import { ruleName } from './node.ref';

export const nodeRule = new Rule(ruleName, anyOf(nodes));
