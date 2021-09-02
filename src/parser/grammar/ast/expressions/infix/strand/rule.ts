import { ruleName } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../utility/space/space.ref';
import { StrandExpression } from '@constructs/ast';
import head from './_components/head/head';
import tail from './_components/tail';

const pattern = sequenceOf([
  head.pattern.named(head.name),
  zeroOrMoreOf(spaceNode),
  tail.pattern.named(tail.name),
]);

const _action =
  // language=JavaScript
  `
          return toConstruct({
                               kind: '${StrandExpression.kind}',
                               head: head,
                               tail,
                             })
        `;

export const strandExpressionRule = new Rule(ruleName, pattern, _action);
