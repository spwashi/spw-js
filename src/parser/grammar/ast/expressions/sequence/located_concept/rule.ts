import { LocatedConceptExpression } from '@constructs/ast/expressions/sequence/located_concept/construct';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = LocatedConceptExpression.components;
const _location = {
  name: components.address.name,
  pattern: location.named(components.address.name),
};
const _concept = {
  name: components.concept.name,
  pattern: concept.named(components.concept.name),
};
const __ = {
  name: 'space',
  pattern: zeroOrMoreOf(space),
};
const pattern = sequenceOf([_location, __, _concept].map(componentize));

// language=JavaScript
const action = `
  const expression = {
    kind: '${LocatedConceptExpression.kind}',
    ${_location.name}: typeof ${_location.name} !== 'undefined' ? ${_location.name} : undefined,
    ${_concept.name}: typeof ${_concept.name} !== 'undefined' ? ${_concept.name} : undefined,
  };
  return toConstruct(expression)
`;
export const locatedConceptExpressionRule = new Rule(ruleName, pattern, action);
