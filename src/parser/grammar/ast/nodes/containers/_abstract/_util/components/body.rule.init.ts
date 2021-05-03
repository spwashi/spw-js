import {
    anyOf,
    oneOrMoreOf,
    RuleReferenceCombinator,
    sequenceOf,
    stringLike,
    zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {newlineCombinator, spaceTab} from '@grammar/base/space/whitespace.patterns';
import {Combinator} from '@spwashi/language/parsers/grammar/combinators/abstract';
import {getContainerNodeComponentReferences} from '../container.ref.init';
import {top} from '@grammar/top/top.ref';

function getEmptyBlockCombinator(opener: RuleReferenceCombinator, closer: RuleReferenceCombinator) {
    const innerPattern = zeroOrMoreOf(anyOf([
                                                spaceTab.withAction('return null'),
                                                sequenceOf([stringLike('_').named('underscore')]).withAction('return underscore'),
                                                newlineCombinator.withAction('return null'),
                                            ]));
    const action       = /* language=JavaScript */ `return {open, close}`
    const pattern      = sequenceOf([opener.named('open'), innerPattern, closer.named('close')]);
    return pattern.withAction(action);
}

export function createContainerBodyRules(ruleName: string): Rule[] {
    const bodyName      = getContainerNodeComponentReferences(ruleName).body.ruleName;
    const listOfAnyNode = oneOrMoreOf(top);
    return [new Rule(bodyName, listOfAnyNode)];
}

export function createContainerPattern(ruleName: string): Combinator {
    const references = getContainerNodeComponentReferences(ruleName);
    const open       = references.open;
    const body       = references.body;
    const close      = references.close;
    const action     = /* language=JavaScript */ `return {open: open, body: body, close: close} `;
    return anyOf([
                     getEmptyBlockCombinator(open, close),
                     sequenceOf([
                                    open.named('open'),
                                    body.named('body'),
                                    close.named('close'),
                                ]).withAction(action),
                 ])
}
