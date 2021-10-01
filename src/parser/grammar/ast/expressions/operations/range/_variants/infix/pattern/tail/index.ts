import { InfixedRangeExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/range/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedRangeExpression.components.tail.name,
  pattern: pattern,
};
