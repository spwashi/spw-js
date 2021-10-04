import { InfixedInvocationExpression } from '@constructs/ast';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { prefixedInvocationExpression } from '../../../prefix/ref';

const __ = zeroOrMoreOf(spaceNode);
export const tailComponent = {
  name: InfixedInvocationExpression.components.tail.name,
  pattern: sequenceOf([__, prefixedInvocationExpression].map(flat)),
};
