import { Block } from '@constructs/ast/expressions/sequence/block/construct';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import _optionalSpaces from '@grammar/ast/expressions/prefix/_abstract/_components/spaces';
import { componentize } from '@grammar/ast/expressions/sequence/_util/componentize';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { blockDelimitingOperator } from '@grammar/ast/nodes/atoms/operators/delimiters/block/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { space } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  oneOrMoreOf,
  optionally,
  sequenceOf,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const _expression = {
  name: 'expression',
  pattern: anyOf([expression, container, node, zeroOrMoreOf(space)]).named('expression'),
};
const _delimiter = {
  name: 'delimiter',
  pattern: blockDelimitingOperator.named('delimiter'),
};

const _optionalDelimiter = optionally(_delimiter.pattern);
const _head = {
  name: 'head',
  pattern: oneOrMoreOf(
    sequenceOf([_expression, _optionalSpaces, _delimiter].map(componentize)).withAction(
      `return ${_expression.name}`,
    ),
  ),
};
const _optionalTail = {
  name: 'tail',
  pattern: optionally(
    sequenceOf([_expression, _optionalSpaces, _optionalDelimiter].map(componentize)).withAction(
      `return ${_expression.name}`,
    ),
  ).named('tail'),
};
const _items = {
  name: Block.components.items.name,
  pattern: anyOf([
    sequenceOf([
      _head.pattern.named(_head.name),
      _optionalSpaces.pattern,
      _optionalTail.pattern.named(_optionalTail.name),
    ])
      // language=JavaScript
      .withAction(`return typeof tail === 'undefined' ? head : [...head, tail];`),
    _expression.pattern.named(_expression.name).withAction(`return [${_expression.name}];`),
  ]),
};

const pattern = sequenceOf([_items.pattern]).named(_items.name);

// language=JavaScript
const action = `
  const block = {
    kind: '${Block.kind}',
    ${_items.name}: typeof ${_items.name} !== "undefined" ? ${_items.name} : undefined,
  };
  return toConstruct(block)
`;
export const blockExpressionRule = new Rule(ruleName, pattern, action);
