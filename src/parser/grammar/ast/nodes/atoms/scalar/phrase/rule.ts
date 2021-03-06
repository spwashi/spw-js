import { PhraseNode } from '@constructs/ast';
import { Rule } from '@spwashi/language/parsers/grammar';
import { ruleName } from './ref';
import { anchorNode } from '../anchor/ref';
import { spaceTab } from '../../../../../utility/space/whitespace.patterns';
import { anyOf, oneOrMoreOf, sequenceOf } from '@spwashi/language/parsers/grammar/combinators';
import { numberNode } from '@grammar/ast/nodes/atoms/scalar/number/ref';

const head = anyOf([anchorNode, numberNode]);

const separator = oneOrMoreOf(spaceTab);

const _tailItemsAction =
  // language=JavaScript
  ` return anchor `;

const tailItems = sequenceOf([
  separator,
  anyOf([anchorNode, numberNode]).named('anchor'),
]).withAction(_tailItemsAction);

const tailSequence = oneOrMoreOf(tailItems);

const _headTailAction =
  // language=JavaScript
  `
              const items =
                        [
                            head,
                            ...tail
                        ];
              return items;
          `;

const rulePattern = sequenceOf([
  sequenceOf([head.named('head'), tailSequence.named('tail')]).withAction(_headTailAction),
]).named('phrase');

const _ruleAction =
  // language=JavaScript
  `
              function makeArray(c) {
                  return Array.isArray(c) ? c : [c];
              }

              /** @var {Array} phrase*/
              const _phrase = phrase;

              const p = _phrase.reduce((p, c) =>
                                           [
                                               ...p,
                                               ...makeArray(c)
                                           ],
                                       []);

              return toConstruct({
                                   kind: '${PhraseNode.kind}',

                                   ${PhraseNode.components.body.name}: p
                               });
          `;

export const phraseNodeRule = new Rule(ruleName, rulePattern, _ruleAction);
