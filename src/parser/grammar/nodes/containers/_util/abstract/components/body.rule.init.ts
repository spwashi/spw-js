import {
    anyOf,
    oneOrMoreOf,
    RuleReferenceCombinator,
    sequenceOf,
    stringLike,
    zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {newlineCombinator, spaceTab} from '../../../../../_base/space/whitespace.patterns';
import {expressions} from '../../../../../expressions/_list.ref';
import {containerNodes} from '../../../_list.ref';
import {Combinator} from '@spwashi/language/parsers/grammar/combinators/abstract';
import {getContainerNodeComponentReferences} from '../container.ref.init';
import {atomNodes} from '../../../../atoms/_list.ref';
import {spaceNode} from '../../../../../_base/space/space.ref';

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
    const bodyName      = getContainerNodeComponentReferences(ruleName).body.name;
    const linebreak     = spaceNode.withAction('return null');
    const listOfAnyNode = oneOrMoreOf(anyOf([...expressions, ...atomNodes, ...containerNodes, linebreak]));
    const pattern       = sequenceOf([listOfAnyNode.named('items')]);
    const action        = /* language=JavaScript */ `
        const entries = items.filter(i => i != null);
        const key     = items.map(i => i && i.key).filter(Boolean).join(', ');
        return toSpwItem({kind: 'node-body', key: key, entries: entries})
    `;
    return [new Rule(bodyName, pattern.withAction(action))];
}

export function createContainerPattern(ruleName: string): Combinator {
    const references = getContainerNodeComponentReferences(ruleName);
    const open       = references.open.ref;
    const body       = references.body.ref;
    const close      = references.close.ref;
    // language=JavaScript
    const action     = `return {open: open, body: body, close: close} `;
    return anyOf([
                     getEmptyBlockCombinator(open, close),
                     sequenceOf([
                                    open.named('open'),
                                    body.named('body'),
                                    close.named('close'),
                                ]).withAction(action),
                 ])
}
