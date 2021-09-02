import { operator } from '@grammar/ast/nodes/atoms/operators/_abstract/operator.ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export default {
  name: 'operator',
  pattern: anyOf([operator]),
};
