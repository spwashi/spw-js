import {anyOf, oneOrMoreOf, sequenceOf, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {spaceTab} from '../../../../base/space/whitespace.patterns';
import {ruleName} from './ref';
import {PhraseExpression} from '@constructs/ast';
import {compositionalNodes} from '@grammar/ast/nodes/_abstract/_list/node.list.ref';

const allowedElements =
          [
              ...compositionalNodes,
          ];

const head =
          anyOf(allowedElements);

const delimiter =
          zeroOrMoreOf(spaceTab);

const tail =
          oneOrMoreOf(
              sequenceOf([
                             delimiter,
                             anyOf(allowedElements)
                                 .named('tail'),
                         ])
                  .withAction(`return tail`),
          );

const pattern =
          sequenceOf([
                         head.named('head'),
                         tail.named('tail'),
                     ]);

const _action =
          // language=JavaScript
          `
              var items = [head, ...tail];
              return toSpwItem({
                                   kind:  '${PhraseExpression.kind}',
                                   items: items
                               })
          `;

export const phraseExpressionRule = new Rule(ruleName, pattern, _action)