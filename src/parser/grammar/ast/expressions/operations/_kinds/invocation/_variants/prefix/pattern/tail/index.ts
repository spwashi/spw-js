import { PrefixedInvocationExpression } from '@constructs/ast';
import { stdPrefixExpNodes } from '@grammar/ast/expressions/operations/_util/prefixed/tail';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const tailComponent = {
  name: PrefixedInvocationExpression.components.tail.name,
  pattern: anyOf(stdPrefixExpNodes),
};
