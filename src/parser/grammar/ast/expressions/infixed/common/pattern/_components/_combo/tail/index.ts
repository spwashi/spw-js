import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { expressionComponent } from '../../_util/expression';

export const tailComponent = {
  name: 'tail',
  pattern: sequenceOf([expressionComponent.pattern]).named('tail'),
};
