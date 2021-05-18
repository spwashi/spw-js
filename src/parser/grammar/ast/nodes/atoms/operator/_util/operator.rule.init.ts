import {anyOf, referenceTo, RuleReferenceCombinator, sequenceOf, StringCombinator, stringLike} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anchorNode} from '../../scalar/anchor/ref';
import {ISpwConstructStatic} from '@constructs/ast/_abstract/spwConstruct';
import {IAtomicSpwOperatorStatic} from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';

function init(token: StringCombinator, ruleName: string, nodeName: string, doLabel = true): Rule {
    const _labeledTokenAction =
              // language=JavaScript
              `
                  return {
                      token,
                      label
                  }
              `;

    const labeledToken =
              !doLabel ? token
                       : (sequenceOf([
                                         token.named('token'),
                                         stringLike('_'),
                                         anchorNode.named('label'),
                                     ]).withAction(_labeledTokenAction));

    const pattern =
              anyOf([
                        labeledToken,
                        token,
                    ].filter(Boolean));

    const _ruleAction =
              // language=JavaScript
              `
                  return toSpwItem({
                                       kind: "${nodeName}",
                                       ..._operatorComponents
                                   })
              `;

    return new Rule(ruleName, sequenceOf([
                                             pattern
                                                 .named('_operatorComponents'),
                                         ]), _ruleAction);
}

type Operator<T extends string> =
    ISpwConstructStatic
    & IAtomicSpwOperatorStatic<T>
    & { name: string };
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