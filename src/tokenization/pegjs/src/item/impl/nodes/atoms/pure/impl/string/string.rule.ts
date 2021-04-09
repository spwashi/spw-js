import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {StringNode} from '@constructs/item';

function getStringRulePattern() {
    const double_quote           = patterns.regExp(`\\"`);
    const single_quote           = patterns.regExp(`\\'`);
    const backslash              = patterns.string('\\\\');
    const standardStringPatterns = [patterns.reference('UnicodeWithoutQuotes'), patterns.regExp('\\n')];
    const singleQuoteBody        =
              patterns.zeroOrMore(
                  patterns.any([...standardStringPatterns, double_quote]),
                  'body',
              );
    const doubleQuoteBody        =
              patterns.zeroOrMore(
                  patterns.any([
                                   patterns.sequence([backslash, double_quote], 'quote', '{ return "\\"" }'),
                                   ...standardStringPatterns,
                                   single_quote,
                               ]),
                  'body');
    return patterns.sequence(
        [
            patterns.any([
                             patterns.sequence([single_quote, singleQuoteBody, single_quote],
                                               null,
                                               '{ return body.join(""); }'),
                             patterns.sequence([double_quote, doubleQuoteBody, double_quote],
                                               null,
                                               '{ return body.join(""); }'),
                         ])
                    .named('string'),
        ],
    );
}

const stringRulePattern = getStringRulePattern();

// language=JavaScript
const stringRuleAction = ` {
    return toSpwItem({
                       kind: '${StringNode.kind}',
                       key:  string
                   });
}`;


export const stringNodeRule    = rule('String', stringRulePattern, stringRuleAction);
export const stringNodeRulePattern = patterns.reference('String');

