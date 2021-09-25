import { BlockExpression } from '@constructs/ast/expressions/sequence/block/construct';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import _optionalSpaces from '@grammar/ast/expressions/prefix/_abstract/_components/spaces';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { blockDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/block_delimiter/ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const _expression = {
  name: 'expression',
  pattern: anyOf([expression, container, node, channelOperator]),
};
const _delimiter = {
  name: 'delimiter',
  pattern: blockDelimiter.named('delimiter'),
};
const _head = {
  name: 'head',
  pattern: oneOrMoreOf(
    sequenceOf(
      [_expression, _optionalSpaces, _delimiter, _optionalSpaces].map(componentize),
    ).withAction(`return ${_expression.name}`),
  ),
};
const _tail = {
  name: 'tail',
  pattern: sequenceOf([_expression.pattern]).named('tail'),
};

// Head and Tail
// language=JavaScript
const pattern1 = sequenceOf([
  _head.pattern.named(_head.name),
  _optionalSpaces.pattern,
  _tail.pattern.named(_tail.name),
]).withAction(`return [...head, tail];`);

// Only Head
// language=JavaScript
const pattern2 = _head.pattern.named(_head.name).withAction(`return [...${_head.name}]`);

// Only Tail
const pattern3 = _tail.pattern.named(_tail.name).withAction(`return [${_tail.name}];`);

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
