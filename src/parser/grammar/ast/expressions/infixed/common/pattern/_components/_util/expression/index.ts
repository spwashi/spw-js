import { scalar } from '@grammar/ast/nodes/atoms/scalars/_abstract/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/ref';
import { anyOf } from '@spwashi/language/parsers/grammar/combinators';

export const expressionComponent = {
  name: 'expression',
  pattern: anyOf([container, scalar]),
};
