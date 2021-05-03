import {ruleName} from './labeled_atom.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {perspectiveAtom} from '../perspective/perspective.ref';
import {performanceAtom} from '../performance/performance.ref';
import {invocationAtom} from '../invocation/invocation.ref';
import {evaluationAtom} from '../evaluation/evaluation.ref';
import {channelAtom} from '../channel/channel.ref';

export const labeledAtomNodeRule = new Rule(ruleName,
                                            combinators.anyOf([
                                                                  channelAtom,
                                                                  evaluationAtom,
                                                                  invocationAtom,
                                                                  performanceAtom,
                                                                  perspectiveAtom,
                                                              ]));