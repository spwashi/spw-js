import { AggregationExpressionTail } from '@constructs/ast';
import { spaceNode } from '@grammar/utility/space/space.ref';
import {
  oneOrMoreOf,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import _item from './_components/item';
import _operator from './_components/operator';

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
