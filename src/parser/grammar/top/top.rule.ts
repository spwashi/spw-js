import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import _optionalSpaces from '@grammar/ast/expressions/prefix/_abstract/_components/spaces';
import { block } from '@grammar/ast/expressions/sequence/block/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { ruleName } from '@grammar/top/top.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';

const __ = _optionalSpaces.pattern;

const body = anyOf([block, expression, container, node]).named('body');
const pattern = sequenceOf([__, body, __]);

const action =
  // language=JavaScript
  `
          const items = Array.isArray(body)
                        ? body
                          .map(item => item && item.kind ? item : undefined)
                          .filter(item => typeof item !== 'undefined')
                        : body;
          return items.length === 1 ? items [0] : items;
        `;

export const topRule = new Rule(ruleName, pattern, action);
