import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {pureAtomNodeRulePattern} from '../../nodes/atoms/pure';
import {labeledAtomNodeRulePattern} from '../../nodes/atoms/labeled/abstract/ref';
import {spaceNodeRulePattern} from '../../../../utility/space/space';
import {StrandExpression} from '@constructs/item/impl/expressions/impl/strand';

const ruleName                           = StrandExpression.name;
export const strandExpressionRulePattern = patterns.reference(ruleName)


//language=JavaScript
const action                      = `return toSpwItem({kind: 'strand', head, tail})`;
const headComponent               = patterns.any([
                                                     pureAtomNodeRulePattern,
                                                     labeledAtomNodeRulePattern,
                                                 ])
                                            .named('head');
const tailComponents              = patterns.oneOrMore(patterns.sequence([
                                                                             patterns.zeroOrMore(spaceNodeRulePattern),
                                                                             patterns.string('=>').named('transport'),
                                                                             patterns.zeroOrMore(spaceNodeRulePattern),
                                                                             patterns.any([
                                                                                              strandExpressionRulePattern,
                                                                                              pureAtomNodeRulePattern,
                                                                                          ])
                                                                                     .named('tail'),
                                                                         ])
                                                               .withAction(`return toSpwItem({kind:'strand-tail', tail, transport})`))
                                            .named('tail');
export const strandExpressionRule = rule(ruleName,
                                         patterns.sequence([headComponent, patterns.zeroOrMore(spaceNodeRulePattern), tailComponents]),
                                         action)