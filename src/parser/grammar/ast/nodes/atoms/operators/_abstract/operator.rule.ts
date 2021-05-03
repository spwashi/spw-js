import {ruleName} from './operator.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {
    channelOperator,
    evaluationOperator,
    invocationOperator,
    performanceOperator,
    perspectiveOperator,
} from '@grammar/ast/nodes/atoms/operators/operators';

export const labeledAtomNodeRule = new Rule(ruleName,
                                            combinators.anyOf([
                                                                  channelOperator,
                                                                  evaluationOperator,
                                                                  invocationOperator,
                                                                  performanceOperator,
                                                                  perspectiveOperator,
                                                              ]));