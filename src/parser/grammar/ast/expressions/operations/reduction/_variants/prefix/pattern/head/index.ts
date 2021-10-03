import { PrefixedReductionExpression } from '@constructs/ast/expressions/infixed/operations/reduction/_variants/prefixed/expression';
import { reductionOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reduction/ref';

export const operatorComponent = {
  name: PrefixedReductionExpression.components.head.name,
  pattern: reductionOperator,
};
