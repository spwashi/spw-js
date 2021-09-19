import { BehaviorExpression } from '@constructs/ast/expressions/sequence/behavior/construct';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { domain } from '@grammar/ast/nodes/containers/domain/ref';
import { essence } from '@grammar/ast/nodes/containers/essence/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = BehaviorExpression.components;
const _domain = {
  name: components.domain.name,
  pattern: domain.named(components.domain.name),
};
const _essence = {
  name: components.essence.name,
  pattern: essence.named(components.essence.name),
};
const _location = {
  name: components.address.name,
  pattern: location.named(components.address.name),
};
const __ = {
  name: undefined,
  pattern: zeroOrMoreOf(space),
};
const pattern = sequenceOf([_location, __, _domain, __, _essence].map(componentize));

// language=JavaScript
const action = `
  const expression = {
    kind: '${BehaviorExpression.kind}',
    ${_domain.name}: ${_domain.name},
    ${_essence.name}: ${_essence.name},
    ${_location.name}: ${_location.name}
  };
  return toConstruct(expression)
`;
export const behaviorExpressionRule = new Rule(ruleName, pattern, action);