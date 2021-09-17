import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, regExpLike } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './unicode.ref';

const unicode = anyOf([
  regExpLike(`-a-zA-Z \\t\\'`),
  // not a double quote or backtick (because these are used in other constructs)
  regExpLike(`\\u0020-\\u0021,\\u0023-\\u0059,\\u0061-\\u26FF`),
]);

export const unicodeRule = new Rule(ruleName, unicode);
