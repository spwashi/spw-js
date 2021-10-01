import { PrefixedRangeExpression } from '@constructs/ast/expressions/infixed/operations/range/_variants/prefixed/expression';
import { rangeOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/range/ref';

export const operatorComponent = {
  name: PrefixedRangeExpression.components.head.name,
  pattern: rangeOperator,
};
