import {anyOf, regExpLike, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {StringNode} from '@constructs/ast';
import {unicode_noQuotes} from '../../../../../base/unicode/unicode.ref';
import {ruleName} from './ref';

const doubleQuote = regExpLike(`\\"`);
const singleQuote = regExpLike(`\\'`);
const backslash   = stringLike('\\\\');
const newline     = regExpLike('\\n');

const _escapedDoubleQuoteAction =
          // language=JavaScript
          `
              return "\\""
          `;

const escapedDoubleQuote =
          sequenceOf([
                         backslash,
                         doubleQuote,
                     ])
              .withAction(_escapedDoubleQuoteAction);

const singleQuoteBody =
          zeroOrMoreOf(
              anyOf([
                        unicode_noQuotes,
                        newline,
                        doubleQuote,
                    ]),
          );

const doubleQuoteBody =
          zeroOrMoreOf(
              anyOf([
                        escapedDoubleQuote,
                        unicode_noQuotes,
                        newline,
                        singleQuote,
                    ]),
          );

const _stringAction =
          // language=JavaScript
          `
              return body.join("");
          `;

const pattern = sequenceOf([
                               anyOf([
                                         sequenceOf([
                                                        singleQuote,
                                                        singleQuoteBody
                                                            .named('body'),
                                                        singleQuote,
                                                    ])
                                             .withAction(_stringAction),
                                         sequenceOf([
                                                        doubleQuote,
                                                        doubleQuoteBody
                                                            .named('body'),
                                                        doubleQuote,
                                                    ])
                                             .withAction(_stringAction),
                                     ])
                                   .named('string'),
                           ]);

// language=JavaScript
const action = `return toSpwItem({kind: '${StringNode.kind}', token: '"', chars: string});`;


export const stringNodeRule = new Rule(ruleName, pattern, action);

