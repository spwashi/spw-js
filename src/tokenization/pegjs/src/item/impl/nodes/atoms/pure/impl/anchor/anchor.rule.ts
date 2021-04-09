import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';


const string1Pattern   = patterns.sequence([
                                               patterns.oneOrMore(patterns.regExp('a-zA-Z')).named('head'),
                                               patterns.zeroOrMore(patterns.regExp('a-zA-Z\\d')).named('tail'),
                                           ])
    // language=JavaScript
                                 .withAction('return [...head, ...tail].join("");');
const string2Pattern   = patterns.sequence([
                                               patterns.oneOrMore(patterns.regExp('a-zA-Z')).named('head'),
                                               patterns.oneOrMore(patterns.regExp('-a-zA-Z_\\d')).named('tail'),
                                               patterns.regExp('a-zA-Z\\d').named('tail_2'),
                                           ])
    // language=JavaScript
                                 .withAction('return [...head, ...tail, tail_2].join("");');
const ampersandPattern = patterns.string('&');

const anchorComponent = patterns.sequence([patterns.any([string1Pattern, string2Pattern, ampersandPattern])
                                                   .named('anchor')])

// language=JavaScript
const _action = `return toSpwItem({kind: 'anchor', key: anchor});`;

export const anchorRule = rule('Anchor', anchorComponent, _action);
