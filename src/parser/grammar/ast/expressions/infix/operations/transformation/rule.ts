import { InfixedTransformationExpression } from '@constructs/ast';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../../utility/space/space.ref';
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
                               kind: '${InfixedTransformationExpression.kind}',
                               head: head,
                               tail,
                             })
        `;

export const transformationExpressionRule = new Rule(ruleName, pattern, _action);
