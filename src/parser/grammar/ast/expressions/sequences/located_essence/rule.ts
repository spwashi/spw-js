import { LocatedEssenceExpression } from '@constructs/ast/expressions/sequence/located_essence/construct';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { essence } from '@grammar/ast/nodes/containers/essence/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = LocatedEssenceExpression.components;
const _location = {
  name: components.address.name,
  pattern: location.named(components.address.name),
};
const _essence = {
  name: components.essence.name,
  pattern: essence.named(components.essence.name),
};
const pattern = sequenceOf([_location, _essence].map(flat));

// language=JavaScript
const action = `
  const expression = {
    kind: '${LocatedEssenceExpression.kind}',
    ${_location.name}: typeof ${_location.name} !== 'undefined' ? ${_location.name} : undefined,
    ${_essence.name}: typeof ${_essence.name} !== 'undefined' ? ${_essence.name} : undefined,
  };
  return toConstruct(expression)
`;
export const locatedEssenceExpressionRule = new Rule(ruleName, pattern, action);
