import { ruleName } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { EntityExpression } from '@constructs/ast/expressions/sequence/entity/construct';
import { referenceOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/reference/ref';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { scalar } from '@grammar/ast/nodes/atoms/scalars/_abstract/scalar.ref';

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
    ${_anchor.name}: typeof ${_anchor.name} !== 'undefined' ? ${_anchor.name} : undefined,
    ${_concept.name}: typeof ${_concept.name} !== 'undefined' ? ${_concept.name} : undefined
  };
  return toConstruct(expression)
`;
export const entityExpressionRule = new Rule(ruleName, pattern, action);
