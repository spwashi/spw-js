import { PrefixedAggregationExpression } from '@constructs/ast';
import { stdPrefixExpNodes } from '@grammar/ast/expressions/operations/_util/prefixed/tail';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const tailComponent = {
  name: PrefixedAggregationExpression.components.tail.name,
  pattern: anyOf(stdPrefixExpNodes),
};
