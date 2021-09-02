import {
  oneOrMoreOf,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import _operator from './_components/operator';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { StrandTail } from '@constructs/ast';
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
                         kind: '${StrandTail.kind}',

                         ${_operator.name}:                  operator,
                         ${StrandTail.components.item.name}: item,
                       });
  `,
);

const tail = oneOrMoreOf(_tailSegmentPattern);

export default {
  name: 'tail',
  pattern: tail,
};
