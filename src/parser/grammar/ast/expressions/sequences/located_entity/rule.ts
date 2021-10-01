import { LocatedEntityExpression } from '@constructs/ast/expressions/sequence/located_entity/construct';
import { entityExpression } from '@grammar/ast/expressions/sequences/entity/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = LocatedEntityExpression.components;
const _location = {
  name: components.address.name,
  pattern: location.named(components.address.name),
};
const _entity = {
  name: components.entity.name,
  pattern: entityExpression.named(components.entity.name),
};

const pattern = sequenceOf([_location.pattern, _entity.pattern]);

// language=JavaScript
const action = `
  const expression = {
    kind: '${LocatedEntityExpression.kind}',
    ${_location.name}: typeof ${_location.name} !== 'undefined' ? ${_location.name} : undefined,
    ${_entity.name}: typeof ${_entity.name} !== 'undefined' ? ${_entity.name} : undefined,
  };
  return toConstruct(expression)
`;
export const locatedEntityExpressionRule = new Rule(ruleName, pattern, action);
