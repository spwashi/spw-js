import { expression } from '@grammar/ast/expressions/_abstract/ref';
import { block } from '@grammar/ast/expressions/infixed/block/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/ref';
import { ruleName } from '@grammar/top/top.ref';
import { newline, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anyOf, sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';

const __ = zeroOrMoreOf(anyOf([spaceTab, newline]));

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
