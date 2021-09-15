import {
  anyOf,
  RuleReferenceCombinator,
  sequenceOf,
  stringLike,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { Rule } from '@spwashi/language/parsers/grammar';
import { newline, space, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { Combinator } from '@spwashi/language/parsers/grammar/combinators/abstract';
import { getContainerNodeComponentReferences } from '../container.ref.init';
import { block } from '@grammar/ast/expressions/sequence/block/ref';
import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';

function getEmptyBlockCombinator(
  opener: RuleReferenceCombinator,
  closer: RuleReferenceCombinator,
): Combinator {
  const innerPattern = zeroOrMoreOf(
    anyOf([
      spaceTab.withAction('return null'),
      sequenceOf([stringLike('_').named('underscore')]).withAction('return underscore'),
      newline.withAction('return null'),
    ]),
  );

  const pattern = sequenceOf([opener.named('open'), innerPattern, closer.named('close')]);
  const _action =
    // language=JavaScript
    `
            return {
              open,
              close
            };
          `;
  return pattern.withAction(_action);
}

export function createContainerBodyRules(ruleName: string): Rule[] {
  const bodyName = getContainerNodeComponentReferences(ruleName).body.ruleName;

  // either an expression or a block
  const listOfAnyNode = sequenceOf([
    anyOf([block, expression, container, node]).named('expression'),
  ]).withAction('return expression');
  return [new Rule(bodyName, listOfAnyNode)];
}

export function createContainerPattern(ruleName: string): Combinator {
  const { open, body, close } = getContainerNodeComponentReferences(ruleName);
  const __ = zeroOrMoreOf(space);

  // language=JavaScript
  const _action = ` return { open, body, close } `;

  return anyOf([
    getEmptyBlockCombinator(open, close),
    sequenceOf([open.named('open'), __, body.named('body'), __, close.named('close')]).withAction(
      _action,
    ),
  ]);
}
