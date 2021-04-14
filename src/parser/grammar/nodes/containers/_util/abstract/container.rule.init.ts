import {Rule} from '@spwashi/language/parsers/grammar';
import {createDelimiterRule} from './components/delimiter.rule.init';
import {createContainerBodyRules, createContainerPattern} from './components/body.rule.init';
import {sequenceOf} from '@spwashi/language/parsers/grammar/combinators';


export const createContainerRule =
                 ({
                      name: ruleName,
                      kind,
                      openToken,
                      closeToken,
                  }: {
                     name: string,
                     kind: string,
                     closeToken: string,
                     openToken: string
                 }): Rule[] => {
                     const opener  = createDelimiterRule(ruleName, openToken, 'open');
                     const closer  = createDelimiterRule(ruleName, closeToken, 'close');
                     const body    = createContainerBodyRules(ruleName);
                     const pattern = sequenceOf([createContainerPattern(ruleName).named('container')]);
                     const action  = /* language=JavaScript */ `
                         const key =
                                   [
                                       container.open.key + (container.open.anchor ? ' ' : ''),
                                       (container.body || {}).key || '#',
                                       container.close.key
                                   ].join('');
                         return toSpwItem({...container, key: key, kind: '${kind}'})
                     `;
                     return [
                         opener,
                         closer,
                         ...body,

                         new Rule(ruleName, pattern, action),
                     ];
                 };

