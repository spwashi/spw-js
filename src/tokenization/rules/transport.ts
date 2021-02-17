import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';
import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';

const subjectiveTransport    =
          rule('SubjectiveTransport', patterns.any([
                                                       patterns.sequence(
                                                           [
                                                               patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                                               patterns.string('>'),
                                                           ],
                                                       ),
                                                   ],
                                                   'transport'),
               // language=JavaScript
                  `
                  {
                      return spwNode({
                                         kind:  'transport',
                                         basis: transport.join("")
                                     })
                  }
              `,
          );
const analogicalTransport    =
          rule('AnalogicalTransport',
               patterns.any([
                                patterns.sequence(
                                    [
                                        patterns.zeroOrMore(patterns.regExp('\\t ')),
                                        patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                        patterns.zeroOrMore(patterns.regExp('\\t ')),
                                    ],
                                ),
                            ],
                            'operator'),
               // language=JavaScript
                  `
                  {
                      return spwNode({
                                         kind:  'analogical-operator',
                                         basis: operator.join("")
                                     })
                  }
              `,
          );
const consequentialTransport =
          rule(
              'ConsequentialTransport',
              patterns.any([
                  patterns.string('=>>'),
                               patterns.sequence(
                                   [
                                       patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                       patterns.any([
                                                        patterns.rule('Domain'),
                                                        patterns.rule('Essence'),
                                                        patterns.rule('Concept'),
                                                    ], 'body'),
                                       patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                       patterns.string('>>'),
                                   ],
                                   null,
                                   // language=JavaScript
                                   `
                                       return {
                                           body
                                       }
                                   `,
                               ),
                               patterns.sequence(
                                   [
                                       patterns.sequence([
                                                             patterns.any([
                                                                              patterns.rule('Domain'),
                                                                              patterns.rule('Essence'),
                                                                              patterns.rule('Concept'),
                                                                          ], 'body'),
                                                             patterns.optional(patterns.rule('DescriptionSequence'), 'description'),
                                                         ],
                                                         'body',
                                                         'return {body, description}'),
                                       patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                       patterns.string('>>'),
                                   ],
                                   null,
                                   // language=JavaScript
                                       `
                                       return {
                                           body
                                       }
                                   `,
                               ),
                           ],
                           'operator'),
              // language=JavaScript
                  `
                  {
                      return spwNode({
                                         kind:  'consequential-operator',
                                         basis: operator
                                     })
                  }
              `,
          );
const objectiveTransport     =
          rule('ObjectiveTransport', patterns.any([
                                                      patterns.sequence(
                                                          [
                                                              patterns.string('<'),
                                                              patterns.string('='),
                                                              patterns.oneOrMore(patterns.string('='), 'eq', '{ return eq.join(\'\')}'),
                                                          ],
                                                      ),
                                                  ],
                                                  'transport'),
               // language=JavaScript
                  `
                  {
                      return spwNode({
                                         kind:  'transport',
                                         basis: transport.join("")
                                     })
                  }
              `,
          )

export const transportRules = [objectiveTransport, subjectiveTransport, analogicalTransport, consequentialTransport];