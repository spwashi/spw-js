import { CommonExpression } from '@constructs/ast';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { pattern1 } from './pattern/pattern1';
import { pattern2 } from './pattern/pattern2';
import { ruleName } from './ref';

const _items = {
  name: CommonExpression.components.items.name,
  pattern: anyOf([pattern1, pattern2]),
};
const pattern = sequenceOf([_items.pattern]).named(_items.name);

// language=JavaScript
const action = `
  const common = {
    kind: '${CommonExpression.kind}',
    ${_items.name}: typeof ${_items.name} !== "undefined" ? ${_items.name} : undefined,
  };
  return toConstruct(common)
`;
export const commonExpressionRule = new Rule(ruleName, pattern, action);
