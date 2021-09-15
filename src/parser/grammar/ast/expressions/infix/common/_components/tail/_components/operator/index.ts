import { CommonExpressionTail } from '@constructs/ast/expressions/infix/common/_components/tail';
import { commonDelimitingOperator } from '@grammar/ast/nodes/atoms/operators/delimiters/common/ref';

const _operator = {
  name: CommonExpressionTail.components.operator.name,
  pattern: commonDelimitingOperator,
};
export default _operator;
