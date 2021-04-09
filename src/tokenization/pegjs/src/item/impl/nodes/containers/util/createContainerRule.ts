import {Rule, rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {createDelimiterRule} from './delimiters';
import {createContainerBodyRules, getWrapperBodyPattern} from './body';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';


export const createContainerRule =
                 (tokens: [string, string], kind: string, ruleName: string): Rule[] => {
                     const opener = createDelimiterRule(`${ruleName}Open`, tokens[0]);
                     const closer = createDelimiterRule(`${ruleName}Close`, tokens[1], true);
                     const body   = createContainerBodyRules(`${ruleName}Body`);

                     const bodyPattern = patterns.sequence([
                                                               getWrapperBodyPattern(body.ref, [opener.ref, closer.ref]),
                                                           ])
                                                 .named('container');

                     return [
                         opener.rule,
                         closer.rule,
                         body.rule,

                         // language=JavaScript
                         rule(ruleName, bodyPattern, `return toSpwItem({
                                                                           ...container,
                                                                           key:  [
                                                                                     container.open.key + (container.open.anchor ? ' ' : ''),
                                                                                     (container.body || {}).key || '#',
                                                                                     container.close.key
                                                                                 ].join(''),
                                                                           kind: '${kind}'
                                                                       })`),
                     ];
                 };

