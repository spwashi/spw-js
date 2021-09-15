import { StrandExpressionTail } from '@constructs/ast/expressions/infix/strand/_components/tail';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export default {
  name: StrandExpressionTail.components.operator.name,
  pattern: transformationOperator,
};
