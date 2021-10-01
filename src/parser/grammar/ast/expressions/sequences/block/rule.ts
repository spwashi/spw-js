import { BlockExpression } from '@constructs/ast/expressions/sequence/block/construct';
import { pattern1 } from '@grammar/ast/expressions/sequences/block/pattern/pattern1';
import { pattern2 } from '@grammar/ast/expressions/sequences/block/pattern/pattern2';
import { pattern3 } from '@grammar/ast/expressions/sequences/block/pattern/pattern3';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const _items = {
  name: BlockExpression.components.items.name,
  pattern: anyOf([pattern1, pattern2, pattern3]),
};
const pattern = sequenceOf([_items.pattern]).named(_items.name);

// language=JavaScript
const action = `
  const block = {
    kind: '${BlockExpression.kind}',
    ${_items.name}: typeof ${_items.name} !== "undefined" ? ${_items.name} : undefined,
  };
  return toConstruct(block)
`;
export const blockExpressionRule = new Rule(ruleName, pattern, action);
