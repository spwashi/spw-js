import {Rule} from '@spwashi/language/parsers/grammar';
import {
    anyOf,
    referenceTo,
    RuleReferenceCombinator,
    sequenceOf,
    StringCombinator,
    stringLike,
} from '@spwashi/language/parsers/grammar/combinators';
import {anchorNode} from '../../pure/anchor/anchor.ref';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IUnaryTokenStatic} from '@constructs/ast/nodes/impl/atoms/labeled/abstract/interfaces/unary';

function initLabeledAtomRule(token: StringCombinator, ruleName: string, nodeName: string): Rule {
    const tokenThenLabel = sequenceOf([
                                          token.named('token'),
                                          stringLike('_'),
                                          anchorNode.named('label'),
                                      ]);
    const _action        = /* language=JavaScript */ 'return {token, label}';
    const pattern        = anyOf([tokenThenLabel.withAction(_action), token]);
    const action         = /* language=JavaScript */ `return toSpwItem({kind: "${nodeName}", ...components})`;
    return new Rule(ruleName, sequenceOf([pattern.named('components')]), action);
}
export function getLabeledAtomReference(SpwNode: ISpwItemStatic & IUnaryTokenStatic & { name: string }): RuleReferenceCombinator {
    return referenceTo(SpwNode.name);
}
export function getLabeledAtomRule(SpwNode: ISpwItemStatic & IUnaryTokenStatic & { name: string }): Rule {
    const token = stringLike(SpwNode.token);
    return initLabeledAtomRule(token, SpwNode.name, SpwNode.kind);
}