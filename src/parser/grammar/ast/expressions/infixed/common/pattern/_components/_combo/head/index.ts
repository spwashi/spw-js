import { flat } from '@grammar/ast/expressions/_util/componentize';
import { oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { delimiterComponent } from '../../_util/delimiter';
import { expressionComponent } from '../../_util/expression';
import { __ } from '../../_util/space';

// language=JavaScript
const actionString = `return ${expressionComponent.name}`;
const sequence = sequenceOf([expressionComponent, __, delimiterComponent, __].map(flat));
const recurringPattern = sequence.withAction(actionString);
const pattern = oneOrMoreOf(recurringPattern);
export const headComponent = {
  name: 'head',
  pattern: pattern,
};
