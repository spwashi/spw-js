import { PrefixedPerspectiveExpression } from '@constructs/ast/expressions/operations/perspective/_variants/prefixed/expression';
import { perspectiveOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/perspective/ref';

export const headComponent = {
  name: PrefixedPerspectiveExpression.components.head.name,
  pattern: perspectiveOperator,
};
