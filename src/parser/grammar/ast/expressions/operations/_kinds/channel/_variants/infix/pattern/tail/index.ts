import { InfixedChannelExpression } from '@constructs/ast';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { prefixedChannelExpression } from '../../../prefix/ref';

const __ = zeroOrMoreOf(spaceNode);
export const tailComponent = {
  name: InfixedChannelExpression.components.tail.name,
  pattern: sequenceOf([__, prefixedChannelExpression].map(flat)),
};
