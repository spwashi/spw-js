import { ruleName } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import { sequenceOf, zeroOrMoreOf } from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../utility/space/space.ref';
import { CommonExpression } from '@constructs/ast';
import head from './_components/head/head';
import tail from './_components/tail';

const pattern = sequenceOf([
  head.pattern.named(head.name),
  zeroOrMoreOf(spaceNode),
  tail.pattern.named(tail.name),
]);

// language=JavaScript
const _action = `
  return toConstruct({
                       kind: '${CommonExpression.kind}',
                       head,
                       tail,
                     });
`;

export const commonExpressionRule = new Rule(ruleName, pattern, _action);
