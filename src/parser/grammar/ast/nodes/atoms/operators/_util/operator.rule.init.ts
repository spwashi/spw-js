import {
  anyOf,
  referenceTo,
  RuleReferenceCombinator,
  sequenceOf,
  StringCombinator,
  stringLike,
} from '@spwashi/language/parsers/grammar/combinators';
import { Rule } from '@spwashi/language/parsers/grammar';
import { anchorNode } from '../../scalars/anchor/ref';
import { IConstructClass } from '../../../../../../../constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';

function init(token: StringCombinator, ruleName: string, nodeName: string, doLabel = true): Rule {
  const _labeledTokenAction =
    // language=JavaScript
    `
              return {
                token,
                label
              }
            `;

  const labeledToken = !doLabel
    ? token
    : sequenceOf([token.named('token'), stringLike('_'), anchorNode.named('label')]).withAction(
        _labeledTokenAction,
      );

  const pattern = anyOf([labeledToken, token].filter(Boolean));

  const _ruleAction =
    // language=JavaScript
    `
              return toConstruct({
                                 kind: "${nodeName}",
                                 ..._operatorComponents
                               })
            `;

  return new Rule(ruleName, sequenceOf([pattern.named('_operatorComponents')]), _ruleAction);
}

type Operator<T extends string> = IConstructClass & ITokenOperatorClass<T> & { name: string };
export function getOperatorReference<T extends string>(Op: Operator<T>): RuleReferenceCombinator {
  return referenceTo(Op.name);
}
export function getOperatorRule<Token extends string>(Op: Operator<Token>, doLabel = true): Rule {
  const token = stringLike(Op.token);
  return init(token, Op.name, Op.kind, doLabel);
}
