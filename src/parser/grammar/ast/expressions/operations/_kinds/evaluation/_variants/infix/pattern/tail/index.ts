import { InfixedEvaluationExpression } from '@constructs/ast';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { prefixedEvaluationExpression } from '../../../prefix/ref';

const __ = zeroOrMoreOf(spaceNode);
export const tailComponent = {
  name: InfixedEvaluationExpression.components.tail.name,
  pattern: sequenceOf([__, prefixedEvaluationExpression].map(flat)),
};
