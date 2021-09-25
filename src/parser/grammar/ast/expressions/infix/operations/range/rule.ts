import { InfixedRangeExpression } from '@constructs/ast';
import { spaceNode } from '@grammar/utility/space/space.ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import head from './_components/head/head';
import tail from './_components/tail';
import { ruleName } from './ref';

const pattern = sequenceOf([
  head.pattern.named(head.name),
  zeroOrMoreOf(spaceNode),
  tail.pattern.named(tail.name),
]);

const _action =
  // language=JavaScript
  `
          return toConstruct({
                               kind: '${InfixedRangeExpression.kind}',
                               head: head,
                               tail,
                             })
        `;

export const rangeExpressionRule = new Rule(ruleName, pattern, _action);
