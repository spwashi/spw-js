import {anyOf, regExpLike, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {StringNode} from '@constructs/ast';
import {unicode_noQuotes} from '../../../../_base/unicode/unicode.ref';
import {ruleName} from './string.ref';

const doubleQuote        = regExpLike(`\\"`);
const singleQuote        = regExpLike(`\\'`);
const backslash          = stringLike('\\\\');
const newline            = regExpLike('\\n');
const escapedDoubleQuote = sequenceOf([backslash, doubleQuote]).withAction('return "\\""');
const singleQuoteBody    = zeroOrMoreOf(anyOf([unicode_noQuotes, newline, doubleQuote]));
const doubleQuoteBody    = zeroOrMoreOf(anyOf([
                                                  escapedDoubleQuote,
                                                  unicode_noQuotes,
                                                  newline,
                                                  singleQuote,
                                              ]));
const pattern            = sequenceOf([
                                          anyOf([
                                                    sequenceOf([singleQuote, singleQuoteBody.named('body'), singleQuote])
                                                        .withAction('return body.join("");'),
                                                    sequenceOf([doubleQuote, doubleQuoteBody.named('body'), doubleQuote])
                                                        .withAction('return body.join("");'),
                                                ])
                                              .named('string'),
                                      ]);

// language=JavaScript
const action = `return toSpwItem({kind: '${StringNode.kind}', key: string});`;


export const stringNodeRule = new Rule(ruleName, pattern, action);

