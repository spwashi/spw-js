import { anyOf } from '@spwashi/language/parsers/grammar/combinators';
import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/operator.list.ref';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';

const _operator = {
  name: 'operator',
  pattern: anyOf(pragmaticOperators.filter((i) => i !== transformationOperator)),
};
export default _operator;
