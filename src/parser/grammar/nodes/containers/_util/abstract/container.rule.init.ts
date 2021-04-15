import {Rule} from '@spwashi/language/parsers/grammar';
import {createDelimiterRule} from './components/delimiter.rule.init';
import {createContainerBodyRules, createContainerPattern} from './components/body.rule.init';
import {sequenceOf} from '@spwashi/language/parsers/grammar/combinators';


export const createContainerRules =
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
                         return toSpwItem({
                                              kind:  '${kind}',
                                              open:  container.open,
                                              body:  container.body,
                                              close: container.close,
                                          })
                     `;
                     return [
                         opener,
                         closer,
                         ...body,

                         new Rule(ruleName, pattern, action),
                     ];
                 };

