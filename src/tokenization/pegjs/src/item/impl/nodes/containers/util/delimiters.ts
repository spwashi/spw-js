import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {anchorNodeRulePattern} from '../../atoms/pure/impl/anchor/anchor.ref';
import {spaceNodeRulePattern} from '../../../../../utility/space/space';
import {containerNodeRulePatterns} from '../ref';

const underscore = patterns.string('_');
export function createDelimiterRule(name: string, tok_1: string, reverse: boolean = false) {
    const tokenPattern            = patterns.string(tok_1);
    const plainDelimiterPattern   = patterns.sequence([tokenPattern.named('tok')])
                                            .withAction(`return toSpwItem({key: tok, label: null, kind: 'delimiter'})`);
    const labeledDelimiterPattern =
              (!reverse ? patterns.sequence([
                                                tokenPattern.named('token'),
                                                underscore,
                                                patterns.sequence([
                                                                      patterns.sequence([
                                                                                            patterns.any([anchorNodeRulePattern, ...containerNodeRulePatterns])
                                                                                                    .named('anchor'),
                                                                                            patterns.optional(patterns.sequence([
                                                                                                                                    patterns.any([
                                                                                                                                                     ...containerNodeRulePatterns,
                                                                                                                                                 ]),
                                                                                                                                ]))
                                                                                                    .named('description'),
                                                                                        ])
                                                                              .withAction('return {anchor, description}'),
                                                                  ])
                                                        .named('node'),
                                                spaceNodeRulePattern.withAction('return null')])
                                  .withAction(`return toSpwItem({key: [token, node.anchor.key].join('_'), ...node, kind: 'delimiter' })`)
                        : patterns.sequence([
                                                patterns.any([anchorNodeRulePattern])
                                                        .named('node'),
                                                underscore,
                                                tokenPattern.named('token'),
                                            ])
                                  .withAction(`return toSpwItem({key: [token, node.key].join('_'), anchor: null, kind: 'delimiter' })`)
              )
    return {
        ref:  patterns.reference(name),
        rule: rule(name, patterns.any([labeledDelimiterPattern, plainDelimiterPattern])),
    };
}
