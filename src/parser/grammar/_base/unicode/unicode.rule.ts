import {anyOf, regExpLike} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {ruleName} from './unicode.ref';

const unicode = anyOf([regExpLike(`-a-zA-Z \\t\\'`),
                       regExpLike(`\\u0020-\\u0021,\\u0023-\\u26FF`)]);

export const unicodeRule = new Rule(ruleName, unicode);