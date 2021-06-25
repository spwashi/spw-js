import { ruleName } from './ref';
import { Rule } from '@spwashi/language/parsers/grammar';
import {
  anyOf,
  optionally,
  sequenceOf,
  stringLike,
  zeroOrMoreOf,
} from '@spwashi/language/parsers/grammar/combinators';
import { spaceNode } from '../../../../utility/space/space.ref';
import { Lens, PerspectiveExpression } from '@constructs/ast';
import { node } from '@grammar/ast/nodes/_abstract/node.ref';
import { essence } from '@grammar/ast/nodes/containers/essence/ref';
import { perspectiveOperator } from '@grammar/ast/nodes/atoms/operator/perspective/ref';

const lensWithSpec = sequenceOf([
  perspectiveOperator.named('atom'),
  anyOf([essence]).named('spec'),
]).withAction(
  // language=JavaScript
  `
                      return toConstruct({
                                           kind: '${Lens.kind}',
                                           atom,
                                           spec,
                                       })
                  `,
);

const lens = sequenceOf([perspectiveOperator.named('atom')]).withAction(
  // language=JavaScript
  `
                      return {
                          atom,
                      }
                  `,
);

const pattern = sequenceOf([
  node.named('source'),
  zeroOrMoreOf(spaceNode),
  anyOf([lensWithSpec, lens]).named('lens'),
  zeroOrMoreOf(spaceNode),
  optionally(stringLike('->')),
  zeroOrMoreOf(spaceNode),
  node.named('target'),
]);

const action =
  // language=JavaScript
  `
              return toConstruct({
                                   kind:   '${PerspectiveExpression.kind}',
                                   source,
                                   lens:   lens,
                                   target: target
                               });
          `;

export const perspectiveExpressionRule = new Rule(ruleName, pattern, action);
