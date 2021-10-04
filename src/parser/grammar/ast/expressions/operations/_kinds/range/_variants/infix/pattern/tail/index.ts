import { InfixedRangeExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/_kinds/range/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedRangeExpression.components.tail.name,
  pattern: pattern,
};
