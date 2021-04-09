import {spaceNodeRulePattern} from '../../../../../utility/space/space';
import {RuleReferencePattern} from '@spwashi/language/parsers/grammar/pattern/sub/rule-reference';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {Rule, rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {Pattern} from '@spwashi/language/parsers/grammar/pattern/pattern';
import {newlinePattern, spaceTabPattern} from '../../../../../utility/space/patterns/whitespace';
import {pureAtomNodeRulePattern} from '../../atoms/pure';
import {labeledAtomNodeRulePattern} from '../../atoms/labeled/abstract/ref';
import {strandExpressionRulePattern} from '../../../expressions/strand/rule';

function getEmptyBlockPattern(opener: RuleReferencePattern, closer: RuleReferencePattern) {
    const innerPattern = patterns.zeroOrMore(patterns.any([
                                                              spaceTabPattern.withAction('return null'),
                                                              patterns.sequence([patterns.string('_').named('underscore')]).withAction('return underscore'),
                                                              newlinePattern.withAction('return null'),
                                                          ]));
    //language=JavaScript
    return patterns.sequence([opener.named('open'), innerPattern, closer.named('close')])
                   .withAction(`return {open, close}`);
}


export function createContainerBodyRules(bodyName: string): { rule: Rule, ref: RuleReferencePattern } {
    return {
        rule:
             rule(bodyName,
                  patterns.sequence([
                                        patterns.oneOrMore(
                                            patterns.any([
                                                             strandExpressionRulePattern,
                                                             labeledAtomNodeRulePattern,
                                                             pureAtomNodeRulePattern,
                                                             spaceNodeRulePattern.withAction('return null'),
                                                         ])
                                                    .named('item')
                                                    .withAction('return item'),
                                        )
                                                .named('items'),
                                    ])
                      //language=JavaScript
                          .withAction(`return toSpwItem({
                                                            kind:    'node-body',
                                                            key:     items.map(i => i && i.key)
                                                                          .filter(Boolean)
                                                                          .join(', '),
                                                            entries: items.filter(i => i != null)
                                                        })`),
             ),
        ref: patterns.reference(bodyName),
    };
}
export function getWrapperBodyPattern(body: Pattern, [_opener, _closer]: [Pattern, Pattern]): Pattern {
    const open  = <RuleReferencePattern>_opener;
    const close = <RuleReferencePattern>_closer;
    // language=JavaScript
    return patterns.any([
                            getEmptyBlockPattern(open, close),
                            patterns.sequence([
                                                  open.named('open'),
                                                  body.named('body'),
                                                  close.named('close'),
                                              ])
                                    .withAction(`
                                        {
                                            return {
                                                open:  open,
                                                body:  body,
                                                close: close
                                            }
                                        }
                                    `),
                        ])
}
