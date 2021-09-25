import { expression } from '@grammar/ast/expressions/_abstract/expression.ref';
import { block } from '@grammar/ast/expressions/sequence/block/ref';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { channelOperator } from '@grammar/ast/nodes/atoms/operators/pragmatic/channel/ref';
import { container } from '@grammar/ast/nodes/containers/_abstract/container.ref';
import { newline, space, spaceTab } from '@grammar/utility/space/whitespace.patterns';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  RuleReferenceCombinator,
  sequenceOf,
  stringLike,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { Combinator } from '@spwashi/language/parsers/grammar/combinators/abstract';
import { getContainerNodeComponentReferences } from '../container.ref.init';

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
  const __ = zeroOrMoreOf(anyOf([space, newline]));
  const nodes = [block, channelOperator, expression, container, node, __];
  const inner = anyOf(nodes).named('expression');
  const listOfAnyNode = sequenceOf([
    __.named('leadingspace'),
    inner,
    __.named('trailingspace'),
  ]).withAction('return expression');
  return [new Rule(bodyName, listOfAnyNode)];
}

export function createContainerPattern(ruleName: string): Combinator {
  const { open, body, close } = getContainerNodeComponentReferences(ruleName);

  // language=JavaScript
  const _action = ` return { open, body, close } `;

  return anyOf([
    getEmptyBlockCombinator(open, close),
    sequenceOf([open.named('open'), body.named('body'), close.named('close')]).withAction(_action),
  ]);
}
