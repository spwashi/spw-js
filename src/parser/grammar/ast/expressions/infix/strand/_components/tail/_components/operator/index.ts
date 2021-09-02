import { StrandTail } from '@constructs/ast/expressions/infix/strand/_components/tail';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

export default {
  name: StrandTail.components.operator.name,
  pattern: transformationOperator,
};
