import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/pragmatic/_abstract/_list/operator.list.ref';
import { transformationOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/transformation/ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

const _operator = {
  name: 'operator',
  pattern: anyOf(pragmaticOperators.filter((i) => i !== transformationOperator)),
};
export default _operator;
