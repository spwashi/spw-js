import { PrefixedChannelExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PrefixedChannelExpression.name;
export const prefixedChannelExpression = referenceTo(ruleName);
