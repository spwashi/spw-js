import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { Rule } from '@spwashi/language/parsers/grammar';
import { oneOrMoreOf, regExpLike, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { ruleName } from './ref';

const oneOrMoreDigits = oneOrMoreOf(regExpLike('\\d'));

const numberSequence = sequenceOf([oneOrMoreDigits.named('num')]);

const _action =
  // language=JavaScript
  `
          return toConstruct({
                               kind: "${NumberNode.kind}",
                               ${NumberNode.components.value.name}: parseInt(num.join(''))
                             });
        `;

export const numberRule = new Rule(ruleName, numberSequence, _action);
