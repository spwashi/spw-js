import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';

function createDelimiters(openDelimiter: string, closeDelimiter: string) {
    const open_bracket  = patterns.any([
                                           patterns.sequence([
                                                                 patterns.string(openDelimiter),
                                                                 patterns.string('_'),
                                                                 patterns.rule('LabelNode', 'node'),
                                                             ],
                                                             null,
                                                             '{ return node }'),
                                           patterns.string(openDelimiter, null, '{ return null }'),
                                       ],
    );
    const close_bracket = patterns.any([
                                           patterns.sequence([
                                                                 patterns.rule('LabelNode', 'node'),
                                                                 patterns.string('_'),
                                                                 patterns.string(closeDelimiter),
                                                             ],
                                                             null,
                                                             '{ return node }'),
                                           patterns.string(closeDelimiter, null, '{ return null }'),
                                       ],
    );
    return [open_bracket, close_bracket];
}

const new_line                     = patterns.regExp('\\n,', 'newline');
const whitespace                   = patterns.regExp('\\t ');
const pattern_containerElementBody =
          patterns.oneOrMore(
              patterns.sequence([patterns.any([
                                                  patterns.rule('Phrase'),
                                                  patterns.rule('complexAnchor'),
                                                  patterns.rule('Strand'),
                                                  patterns.rule('Analog'),
                                                  patterns.rule('Perspective'),
                                                  patterns.sequence([
                                                                        patterns.oneOrMore(
                                                                            patterns.sequence([
                                                                                                  patterns.rule('Node', 'node'),
                                                                                                  patterns.zeroOrMore(whitespace),
                                                                                                  patterns.rule('Channel', 'channel'),
                                                                                              ],
                                                                                              null,
                                                                                              'return [node, channel]'),
                                                                            'body',
                                                                        ),
                                                                    ],
                                                                    null,
                                                                    `return spwNode({ kind: 'complex_node', body: body.flatMap(i => i)})`),
                                                  patterns.rule('Node'),
                                                  patterns.oneOrMore(
                                                      patterns.sequence([patterns.zeroOrMore(whitespace), new_line, patterns.zeroOrMore(whitespace)], null, '{ return newline }'),
                                                      'newlines',
                                                      //language=JavaScript
                                                          `
                                                          {
                                                              const length = newlines.length;
                                                              if (length === 1) return undefined;
                                                              return (
                                                                  spwNode({
                                                                      kind:     'space',
                                                                      distance: length - 1
                                                                  })
                                                              )
                                                          }
                                                      `,
                                                  )],
                                              'item'),
                                ],
                                null,
                                'return item',
              ),
              'body',
          );

//language=JavaScript
const inlineDelimiterAction = `
    {
        if (typeof underscore === 'undefined') {
            return {
                objective_anchor:  open_anchor,
                subjective_anchor: close_anchor
            }
        }
        return {
            anchor: open_anchor
        }
    }
`;
export const createDomain   =
                 (open_bracket: string, close_bracket: string, ruleName: string) => {
                     const [open_pattern, close_pattern] = createDelimiters(open_bracket, close_bracket)

                     const openerName = ruleName + 'Open';
                     const closerName = ruleName + 'Close';
                     const bodyName   = ruleName + 'Body';

                     const opener = patterns.rule(openerName, 'open_anchor');
                     const closer = patterns.rule(closerName, 'close_anchor');

                     const bodyPattern =
                               patterns.any(
                                   [

                                       patterns.sequence(
                                           [
                                               opener,
                                               patterns.zeroOrMore(patterns.any([whitespace, new_line])),
                                               closer,
                                           ],
                                           null,
                                           inlineDelimiterAction,
                                       ),
                                       patterns.sequence(
                                           [
                                               opener,
                                               patterns.string('_', 'underscore'),
                                               closer,
                                           ],
                                           null,
                                           inlineDelimiterAction,
                                       ),

                                       patterns.sequence(
                                           [
                                               opener,
                                               patterns.zeroOrMore(whitespace),
                                               patterns.rule(bodyName, 'body'),
                                               patterns.zeroOrMore(whitespace),
                                               closer,
                                           ],
                                           null,
                                           `
                    {
                        return {
                            objective_anchor:  open_anchor,
                            body:              body.filter(i => typeof i !== "undefined"),
                            subjective_anchor: close_anchor
                        }
                    }
                `,
                                       ),
                                   ],
                                   'container',
                               );


                     return [
                         rule(openerName, open_pattern),
                         rule(closerName, close_pattern),
                         rule(bodyName, pattern_containerElementBody),
                         rule(
                             ruleName,
                             bodyPattern, /* language=JavaScript*/
                             `{
                                     return spwNode({kind: '${ruleName.toLowerCase()}', ...container});
                             }`,
                         ),
                     ];
                 };

