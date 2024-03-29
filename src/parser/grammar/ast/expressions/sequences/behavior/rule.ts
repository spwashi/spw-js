import { BehaviorExpression } from '@constructs/ast/expressions/sequences/behavior/construct';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { domain } from '@grammar/ast/nodes/containers/domain/ref';
import { essence } from '@grammar/ast/nodes/containers/essence/ref';
import { location } from '@grammar/ast/nodes/containers/location/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
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
  name: components.location.name,
  pattern: location.named(components.location.name),
};
const __ = {
  name: undefined,
  pattern: zeroOrMoreOf(space),
};
// language=JavaScript

const action = `
  const expression = {
    kind: '${BehaviorExpression.kind}',
    ${_domain.name}: typeof ${_domain.name} !== 'undefined' ? ${_domain.name} : undefined,
    ${_essence.name}: typeof ${_essence.name} !== 'undefined' ? ${_essence.name} : undefined,
    ${_location.name}: typeof ${_location.name} !== 'undefined' ? ${_location.name} : undefined,
  };
  return toConstruct(expression)
`;
const pattern = anyOf([
  sequenceOf([_location, _domain, _essence].map(flat)).withAction(action),
  sequenceOf([_location, _domain].map(flat)).withAction(action),
  sequenceOf([_location, _essence].map(flat)).withAction(action),
  sequenceOf([_location, __, _domain, __, _essence].map(flat)).withAction(action),
  sequenceOf([_location, __, _domain].map(flat)).withAction(action),
  sequenceOf([_location, __, _essence].map(flat)).withAction(action),
  sequenceOf([_domain, _essence].map(flat)).withAction(action),
  sequenceOf([_domain, __, _essence].map(flat)).withAction(action),
  sequenceOf([_location].map(flat)).withAction(action),
  sequenceOf([_domain].map(flat)).withAction(action),
  sequenceOf([_essence].map(flat)).withAction(action),
]);
export const behaviorExpressionRule = new Rule(ruleName, pattern);
