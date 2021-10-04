import { InfixedReductionExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/_kinds/reduction/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedReductionExpression.components.tail.name,
  pattern: pattern,
};
