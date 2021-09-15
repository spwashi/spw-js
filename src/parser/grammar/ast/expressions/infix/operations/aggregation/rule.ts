import { ruleName } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../../utility/space/space.ref';
import { AggregationExpression } from '@constructs/ast';
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
                               kind: '${AggregationExpression.kind}',
                               head: head,
                               tail,
                             })
        `;

export const aggregationExpressionRule = new Rule(ruleName, pattern, _action);
