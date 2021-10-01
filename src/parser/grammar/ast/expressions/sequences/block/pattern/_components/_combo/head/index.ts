import { flat } from '@grammar/ast/expressions/_util/componentize';
import { delimiterComponent } from '@grammar/ast/expressions/sequences/block/pattern/_components/_util/delimiter';
import { expressionComponent } from '@grammar/ast/expressions/sequences/block/pattern/_components/_util/expression';
import { __ } from '@grammar/ast/expressions/sequences/block/pattern/_components/_util/space';
import { oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';

// language=JavaScript
const actionString = `return ${expressionComponent.name}`;
const sequence = sequenceOf([expressionComponent, __, delimiterComponent, __].map(flat));
const recurringPattern = sequence.withAction(actionString);
const pattern = oneOrMoreOf(recurringPattern);
export const headComponent = {
  name: 'head',
  pattern: pattern,
};
