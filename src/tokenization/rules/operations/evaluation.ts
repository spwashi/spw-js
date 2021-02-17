import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {createOperationRule} from './common/createOperationRule';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';

const token         = patterns.string('?');
const whitespace    = patterns.regExp('\\t ');
const whitespace_nl = patterns.regExp('\\n\\t ');
const nodePattern   = patterns.any([patterns.rule('Node')]);

export const evaluationRules =
                 [
                     createOperationRule(token, 'EvaluationAnchor', 'evaluation'),
                     rule('Evaluation',
                          patterns.any([
                                           patterns.sequence([
                                                                 patterns.rule('EvaluationAnchor', 'evaluation'),
                                                                 patterns.zeroOrMore(whitespace),
                                                                 patterns.optional(nodePattern, 'target'),
                                                                 patterns.zeroOrMore(whitespace_nl),
                                                                 patterns.optional(
                                                                     patterns.sequence([patterns.string('=>>'),
                                                                                        patterns.zeroOrMore(whitespace_nl),
                                                                                        patterns.any([patterns.rule('Node')], 'node')],
                                                                                       null,
                                                                                       'return node'),
                                                                     'consequence',
                                                                 ),
                                                             ], null,
                                                             // language=JavaScript
                                                             `
                                                   target      = void 0 !== target ? target : null;
                                                   consequence = void 0 !== consequence ? consequence : null;

                                                   if (!target && !consequence) return evaluation;

                                                   return spwNode({
                                                       kind:  'evaluation',
                                                       label: evaluation,
                                                       target,
                                                       consequence
                                                   })
                                               `),
                                       ])),
                 ];