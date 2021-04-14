import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';
import {expressions} from '../_list.ref';

export const expressionRule = new Rule(ruleName, combinators.anyOf(expressions))
