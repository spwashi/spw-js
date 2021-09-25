import { PrefixedRangeExpression } from '@constructs/ast/expressions/infix/operations/range/_variants/prefixed/expression';
import { rangeOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/range/ref';

export default {
  name: PrefixedRangeExpression.components.operator.name,
  pattern: rangeOperator,
};
