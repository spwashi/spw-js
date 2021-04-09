import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {labeledAtomNodeRulePattern} from './item/impl/nodes/atoms/labeled/abstract/ref';
import {spaceNodeRulePattern} from './utility/space/space';
import dedent from 'dedent';
import {getExpressionPatternList} from './item/impl/expressions';
import {getAtomNodePatternList} from './item/impl/nodes/atoms';
import {containerNodeRulePatterns} from './item/impl/nodes/containers/ref';

const pattern = patterns.sequence([
                                      patterns.zeroOrMore(
                                          patterns.any([
                                                           ...getExpressionPatternList(),
                                                           ...containerNodeRulePatterns,
                                                           ...getAtomNodePatternList(),
                                                           labeledAtomNodeRulePattern,
                                                           spaceNodeRulePattern,
                                                       ]),
                                      ),
                                  ])
                        .named('body');
const action  =
          // language=JavaScript
          dedent`
              const items = Array.isArray(body)
                            ? body
                                .map(item => item && item.kind ? item : undefined)
                                .filter(item => typeof item !== 'undefined')
                            : body;
              return items.length === 1 ? items [0] : items;
          `;

export const topRule = rule('Top', pattern, action);