import { InfixedChannelExpression } from '@constructs/ast/expressions/operations/channel/_variants/infixed/expression';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = InfixedChannelExpression.name;
export const infixedChannelExpression = referenceTo(ruleName);
