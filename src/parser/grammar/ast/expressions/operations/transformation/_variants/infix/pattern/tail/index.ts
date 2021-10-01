import { InfixedTransformationExpression } from '@constructs/ast';
import { pattern } from '@grammar/ast/expressions/operations/transformation/_variants/infix/pattern/tail/pattern';

export const tailComponent = {
  name: InfixedTransformationExpression.components.tail.name,
  pattern: pattern,
};
