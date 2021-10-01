import { expressionComponent } from '@grammar/ast/expressions/sequences/block/pattern/_components/_util/expression';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';

export const tailComponent = {
  name: 'tail',
  pattern: sequenceOf([expressionComponent.pattern]).named('tail'),
};
