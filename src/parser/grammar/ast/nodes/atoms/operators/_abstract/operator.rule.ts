import {ruleName} from './operator.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {
    channelAtom,
    evaluationAtom,
    invocationAtom,
    performanceAtom,
    perspectiveAtom,
} from '@grammar/ast/nodes/atoms/operators/operators';

export const labeledAtomNodeRule = new Rule(ruleName,
                                            combinators.anyOf([
                                                                  channelAtom,
                                                                  evaluationAtom,
                                                                  invocationAtom,
                                                                  performanceAtom,
                                                                  perspectiveAtom,
                                                              ]));