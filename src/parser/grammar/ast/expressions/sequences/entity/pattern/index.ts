import { EntityExpression } from '@constructs/ast';
import { flat } from '@grammar/ast/expressions/_util/componentize';
import { scalar } from '@grammar/ast/nodes/atoms/scalars/_abstract/ref';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const components = EntityExpression.components;
const _concept = {
  name: components.concept.name,
  pattern: concept.named(components.concept.name),
};
const _anchor = {
  name: components.anchor.name,
  pattern: anyOf([scalar]).named(components.anchor.name),
};
const __ = {
  name: 'space',
  pattern: zeroOrMoreOf(space),
};
// language=JavaScript
const action = `
  const expression = {
    kind: '${EntityExpression.kind}',
    ${_anchor.name}: typeof ${_anchor.name} !== 'undefined' ? ${_anchor.name} : undefined,
    ${_concept.name}: typeof ${_concept.name} !== 'undefined' ? ${_concept.name} : undefined
  };
  return toConstruct(expression)
`;
export const pattern = anyOf([
  sequenceOf([_concept, __, _anchor].map(flat)).withAction(action),
  sequenceOf([_concept].map(flat)).withAction(action),
  sequenceOf([_anchor].map(flat)).withAction(action),
]);
