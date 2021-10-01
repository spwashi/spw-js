import { LocatedDomainExpression } from '@constructs/ast/expressions/sequence/located_domain/construct';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { domain } from '@grammar/ast/nodes/containers/domain/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = LocatedDomainExpression.components;
const _location = {
  name: components.address.name,
  pattern: location.named(components.address.name),
};
const _domain = {
  name: components.domain.name,
  pattern: domain.named(components.domain.name),
};

const pattern = sequenceOf([_location, _domain].map(flat));

// language=JavaScript
const action = `
  const expression = {
    kind: '${LocatedDomainExpression.kind}',
    ${_location.name}: ${_location.name},
    ${_domain.name}: ${_domain.name},
  };
  return toConstruct(expression)
`;
export const locatedDomainExpressionRule = new Rule(ruleName, pattern, action);
