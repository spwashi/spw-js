import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


const double_quote = patterns.regExp(`\\"`);
const single_quote = patterns.regExp(`\\'`);
const backslash    = patterns.string('\\\\');

const standardStringPatterns = [patterns.rule('UnicodeWithoutQuotes'),
                                patterns.regExp('\\n'),
];

const singleQuoteBody =
          patterns.zeroOrMore(
              patterns.any([...standardStringPatterns, double_quote]),
              'body',
          );
const doubleQuoteBody =
          patterns.zeroOrMore(
              patterns.any([
                               patterns.sequence([backslash, double_quote], 'quote', '{ return "\\\"" }'),
                               ...standardStringPatterns,
                               single_quote,
                           ]),
              'body');


const rule__UnicodeWithoutQuotes =
          rule(
              'UnicodeWithoutQuotes',
              patterns.any(
                  [
                      patterns.regExp(`-a-zA-Z \\t\\'`),
                      patterns.regExp(`\\u0020-\\u0021,\\u0023-\\u26FF`),
                  ],
              ),
          );
const rule__String               =
          rule(
              'String',
              patterns.any([
                               patterns.sequence([single_quote, singleQuoteBody, single_quote],
                                                 null,
                                                 '{ return body.join(""); }'),
                               patterns.sequence([double_quote, doubleQuoteBody, double_quote],
                                                 null,
                                                 '{ return body.join(""); }'),
                           ], 'string'),
              // language=JavaScript
              `
                  {
                      return spwNode({
                          kind: 'string',
                          key:  string
                      });
                  }`,
          );

export const stringRules =
                 [
                     rule__UnicodeWithoutQuotes,
                     rule__String,
                 ];

