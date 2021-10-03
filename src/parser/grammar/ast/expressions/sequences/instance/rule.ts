import { InstanceExpression } from '@constructs/ast/expressions/sequence/instance/construct';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { behaviorExpression } from '@grammar/ast/expressions/sequences/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequences/entity/ref';
import { locatedDomainExpression } from '@grammar/ast/expressions/sequences/located_domain/ref';
import { locatedEntityExpression } from '@grammar/ast/expressions/sequences/located_entity/ref';
import { newline, space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = InstanceExpression.components;

const _entity = {
  name: components.entity.name,
  pattern: entityExpression.named(components.entity.name),
};
const _behavior = {
  name: components.behavior.name,
  pattern: anyOf([behaviorExpression, locatedDomainExpression, locatedEntityExpression]).named(
    components.behavior.name,
  ),
};
const __ = {
  name: 'space',
  pattern: zeroOrMoreOf(anyOf([space, newline])),
};
const pattern = sequenceOf([_entity, __, _behavior].map(flat));

// language=JavaScript
const action = `
  const expression = {
    kind: '${InstanceExpression.kind}',
    ${_entity.name}: ${_entity.name},
    ${_behavior.name}: ${_behavior.name}
  };
  return toConstruct(expression)
`;
export const instanceExpressionRule = new Rule(ruleName, pattern, action);
