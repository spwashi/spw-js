import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, oneOrMoreOf, regExpLike, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {ruleName} from './ref';

const anchorPattern2 =
          sequenceOf([
                         oneOrMoreOf(regExpLike('a-zA-Z'))
                             .named('head'),
                         zeroOrMoreOf(regExpLike('a-zA-Z\\d'))
                             .named('tail'),
                     ])
              // language=JavaScript
              .withAction(
                  `
                      const characters = [
                          ...head,
                          ...tail
                      ];
                      return characters.join("");
                  `,
              );

// language=JavaScript
const _anchorPattern1Action =
          `
              return [...head, ...tail].join("");
          `
const anchorPattern1        =
          sequenceOf([
                         oneOrMoreOf(regExpLike('a-zA-Z'))
                             .named('head'),

                         oneOrMoreOf(
                             sequenceOf([
                                            anyOf([
                                                      stringLike('-'),
                                                      stringLike('_'),
                                                  ])
                                                .named('line'),
                                            oneOrMoreOf(
                                                regExpLike('a-zA-Z\\d'),
                                            )
                                                .named('chars'),
                                        ])
                                 .withAction(
                                     // language=JavaScript
                                     `
                                         return line + chars.join('')
                                     `,
                                 ),
                         )
                             .named('tail'),
                     ])
              .withAction(_anchorPattern1Action);

const anchorComponent =
          sequenceOf([
                         anyOf([
                                   anchorPattern1,
                                   anchorPattern2,
                               ])
                             .named('anchor'),
                     ])

// language=JavaScript
const _action =
          `
              return toSpwItem({
                                   label: anchor,
                                   kind:  'anchor',
                               });
          `;

export const anchorRule = new Rule(ruleName, anchorComponent, _action);
