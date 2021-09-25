import { CommonExpressionTail } from '@constructs/ast/expressions/infix/common/_components/tail';
import { commonDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/common_delimiter/ref';

const _operator = {
  name: CommonExpressionTail.components.operator.name,
  pattern: commonDelimiter,
};
export default _operator;
