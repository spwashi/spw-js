import { InstanceExpression } from '@constructs/ast/expressions/sequence/instance/construct';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { behaviorExpression } from '@grammar/ast/expressions/sequence/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequence/entity/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const components = InstanceExpression.components;

const _entity = {
  name: components.entity.name,
  pattern: entityExpression.named(components.entity.name),
};
const _behavior = {
  name: components.behavior.name,
  pattern: behaviorExpression.named(components.behavior.name),
};
const __ = {
  name: 'space',
  pattern: zeroOrMoreOf(space),
};
const pattern = sequenceOf([_entity, __, _behavior].map(componentize));

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
