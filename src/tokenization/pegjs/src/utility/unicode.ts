import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const unicodeRule = rule('UnicodeWithoutQuotes',
                                patterns.any([
                                                 patterns.regExp(`-a-zA-Z \\t\\'`),
                                                 patterns.regExp(`\\u0020-\\u0021,\\u0023-\\u26FF`),
                                             ]));