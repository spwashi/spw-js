import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';
import {nodes} from '../_list.ref';

export const nodeRule = new Rule(ruleName, combinators.anyOf(nodes))
