import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';
import {atomNodes} from '../_list.ref';

export const atomRule = new Rule(ruleName, combinators.anyOf(atomNodes))
