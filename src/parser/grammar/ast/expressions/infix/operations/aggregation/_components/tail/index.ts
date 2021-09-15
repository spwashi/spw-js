import {
  oneOrMoreOf,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import _operator from './_components/operator';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { AggregationExpressionTail } from '@constructs/ast';
import _item from './_components/item';

const _tailSequence = [
  zeroOrMoreOf(spaceNode),
  _operator.pattern.named(_operator.name),
  zeroOrMoreOf(spaceNode),
  _item.pattern.named(_item.name),
];

const _tailSegmentPattern = sequenceOf(_tailSequence).withAction(
  // language=JavaScript
  `
    return toConstruct({
                         kind: '${AggregationExpressionTail.kind}',
                         ${_operator.name}: operator,
                         ${_item.name}: item,
                       });
  `,
);

const tail = oneOrMoreOf(_tailSegmentPattern);

export default {
  name: 'tail',
  pattern: tail,
};
