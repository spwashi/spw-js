import { PrefixedReductionExpression } from '@constructs/ast/expressions/operations/reduction/_variants/prefixed/expression';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/ref';

export const headComponent = {
  name: PrefixedReductionExpression.components.head.name,
  pattern: reductionOperator,
};
