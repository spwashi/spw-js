import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './atom.ref';
import {atoms} from './_list/atom.list.ref';

export const atomRule = new Rule(ruleName, combinators.anyOf(atoms))
