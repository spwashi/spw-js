import { EntityExpression } from '@constructs/ast/expressions/sequence/entity/construct';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { referenceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reference/ref';
import { scalar } from '@grammar/ast/nodes/atoms/scalars/_abstract/scalar.ref';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = EntityExpression.components;

const _concept = {
  name: components.concept.name,
  pattern: concept.named(components.concept.name),
};
const _anchor = {
  name: components.anchor.name,
  pattern: anyOf([scalar, referenceOperator]).named(components.anchor.name),
};
const __ = {
  name: 'space',
  pattern: zeroOrMoreOf(space),
};
const pattern = sequenceOf([_concept, __, _anchor].map(componentize));

// language=JavaScript
const action = `
  const expression = {
    kind: '${EntityExpression.kind}',
    ${_anchor.name}: ${_anchor.name},
    ${_concept.name}: ${_concept.name}
  };
  return toConstruct(expression)
`;
export const entityExpressionRule = new Rule(ruleName, pattern, action);
