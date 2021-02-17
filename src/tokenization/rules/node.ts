import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';


const nodeAnchorPatterns = [
    patterns.string(':'),
    // operations
    patterns.rule('Invocation'),
    patterns.rule('Performance'),
    patterns.rule('Evaluation'),
    patterns.rule('Perspective'),

    // operators
    patterns.rule('ChannelAnchor'),
    patterns.rule('PerformanceAnchor'),
    patterns.rule('EvaluationAnchor'),
    patterns.rule('PerspectiveAnchor'),

    // static
    patterns.rule('String'),
    patterns.rule('Anchor'),

    // domains
    patterns.rule('Essence'),
    patterns.rule('Domain'),
    patterns.rule('Aside'),
    patterns.rule('Concept'),
];

const rule__LabelNode =
          rule(
              'LabelNode',
              patterns.any(
                  [
                      patterns.rule('Anchor'),
                      patterns.rule('String'),
                  ],
                  'node',
              ),
              // language=JavaScript
              ` { return node; }`,
          );

const rule__DescriptionSequence =
          rule(
              'DescriptionSequence',
              patterns.zeroOrMore(
                  patterns.sequence(
                      [
                          patterns.zeroOrMore(patterns.regExp('\\t ')),
                          patterns.string('.'),
                          patterns.zeroOrMore(patterns.regExp('\\n\\t ')),
                          patterns.any([
                                           patterns.rule('Concept'),
                                           patterns.rule('Aside'),
                                           patterns.rule('Domain'),
                                           patterns.rule('Essence'),
                                       ],
                                       'description'),
                      ],
                      null,
                      '{ return description; }',
                  ),
              ),
          );
const rule__Node                    =
          rule(
              'Node',
              patterns.any(
                  [
                      patterns.sequence(
                          [
                              patterns.any(nodeAnchorPatterns, 'node'),
                              patterns.optional(patterns.rule('Essence'), 'essence'),
                              patterns.rule('DescriptionSequence', 'description'),
                          ],
                          null,
                          // language=JavaScript
                          `
                              {
                                  const complexNode =
                                            {
                                                kind: 'node',
                                                node,
                                            };
                                  if (!(essence || description.length)) return node;

                                  if (essence) complexNode.essence = essence;
                                  if (description.length) complexNode.description = description;

                                  return spwNode(complexNode);
                              }
                          `,
                      ),
                      patterns.any(nodeAnchorPatterns, 'node'),
                  ],
              ),
              // language=JavaScript
              ` { return node; }`,
          );

export const nodeRules =
                 [
                     rule__DescriptionSequence,
                     rule__LabelNode,
                     rule__Node,
                 ];

