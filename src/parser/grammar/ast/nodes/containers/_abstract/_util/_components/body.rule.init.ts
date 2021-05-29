import {anyOf, oneOrMoreOf, RuleReferenceCombinator, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {newline, spaceTab} from '@grammar/utility/space/whitespace.patterns';
import {Combinator} from '@spwashi/language/parsers/grammar/combinators/abstract';
import {getContainerNodeComponentReferences} from '../container.ref.init';
import {expressions} from '@grammar/ast/expressions/_abstract/_list/expressions.list.ref';
import {nodes} from '@grammar/ast/nodes/_abstract/_list/node.list.ref';
import {spaceNode} from '@grammar/utility/space/space.ref';

function getEmptyBlockCombinator(opener: RuleReferenceCombinator, closer: RuleReferenceCombinator) {
    const innerPattern =
              zeroOrMoreOf(
                  anyOf([
                            spaceTab
                                .withAction('return null'),
                            sequenceOf([
                                           stringLike('_')
                                               .named('underscore'),
                                       ])
                                .withAction('return underscore'),
                            newline
                                .withAction('return null'),
                        ]),
              );

    const pattern =
              sequenceOf([
                             opener
                                 .named('open'),
                             innerPattern,
                             closer
                                 .named('close'),
                         ]);
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
    const bodyName      = getContainerNodeComponentReferences(ruleName).body.ruleName;
    const listOfAnyNode = oneOrMoreOf(anyOf([
                                                ...expressions,
                                                ...nodes,
                                                spaceNode,
                                            ]));
    return [new Rule(bodyName, listOfAnyNode)];
}

export function createContainerPattern(ruleName: string): Combinator {
    const references          = getContainerNodeComponentReferences(ruleName);
    const {open, body, close} = references;

    const _action =
              // language=JavaScript
              `
                  return {
                      open:  open,
                      body:  body,
                      close: close
                  }
              `;

    return anyOf([
                     getEmptyBlockCombinator(open, close),
                     sequenceOf([
                                    open
                                        .named('open'),
                                    body
                                        .named('body'),
                                    close
                                        .named('close'),
                                ]).withAction(_action),
                 ])
}
