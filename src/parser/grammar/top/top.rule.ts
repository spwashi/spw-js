import { anyOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { Rule } from '@spwashi/language/parsers/grammar';
import { ruleName } from '@grammar/top/top.ref';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import _optionalSpaces from '@grammar/ast/expressions/prefix/_abstract/_components/spaces';
import { containerNode } from '@grammar/ast/nodes/containers/_abstract/container.ref';

const __ = _optionalSpaces.pattern;

const body = anyOf([expression, node, containerNode]).named('body');
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
