import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';
import {pureAtomNodes} from '../_list.ref';

export const pureAtomRule = new Rule(ruleName, combinators.anyOf(pureAtomNodes))
