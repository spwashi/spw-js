import {
    anyOf,
    referenceTo,
    RuleReferenceCombinator,
    sequenceOf,
    StringCombinator,
    stringLike,
} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anchorNode} from '../../scalar/anchor/anchor.ref';
import {ISpwItemStatic} from '@constructs/ast/abstract/item';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/impl/atoms/operators/abstract/types/atomic';

function init(token: StringCombinator, ruleName: string, nodeName: string, doLabel = true): Rule {
    const _action =
              /* language=JavaScript */
              `return {token, label}`;
    const pattern = anyOf([
                              doLabel
                              ? sequenceOf([
                                               token.named('token'),
                                               stringLike('_'),
                                               anchorNode.named('label'),
                                           ]).withAction(_action)
                              : token,
                              token,
                          ].filter(Boolean));

    const action =
              /* language=JavaScript */
              `return toSpwItem({kind: "${nodeName}", ...components})`;
    return new Rule(ruleName, sequenceOf([pattern.named('components')]), action);
}

type Operator<T extends string> = ISpwItemStatic & IAtomicSpwOperatorStatic<T> & { name: string };
export function getOperatorReference<T extends string>(SpwNode: Operator<T>): RuleReferenceCombinator {
    return referenceTo(SpwNode.name);
}
export function getOperatorRule<Token extends string>(
    SpwNode: Operator<Token>,
    doLabel = true,
): Rule {
    const token = stringLike(SpwNode.token);
    return init(token, SpwNode.name, SpwNode.kind, doLabel);
}