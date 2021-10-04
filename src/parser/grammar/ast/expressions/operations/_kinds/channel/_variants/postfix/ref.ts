import { PostfixedChannelExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PostfixedChannelExpression.name;
export const postfixedChannelExpression = referenceTo(ruleName);
