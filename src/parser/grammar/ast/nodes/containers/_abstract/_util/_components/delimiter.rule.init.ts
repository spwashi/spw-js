import {anyOf, optionally, SequenceCombinator, sequenceOf, stringLike} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anchorNode} from '../../../../atoms/scalar/anchor/ref';
import {containers} from '../../_list/container.list.ref';
import {getContainerNodeComponentReferences} from '../container.ref.init';
import {spaceNode} from '../../../../../../base/space/space.ref';

function opener(delimiter: IDelimiter): SequenceCombinator {
    const token =
              stringLike(delimiter.token);

    const underscore =
              stringLike('_');

    const headAnchor =
              anyOf([
                        anchorNode,
                        ...containers,
                    ]);

    const headDescription =
              optionally(sequenceOf([anyOf(containers)]));

    const describedAnchor =
              sequenceOf([
                             headAnchor
                                 .named('anchor'),
                             headDescription
                                 .named('description'),
                         ]);

    // language=JavaScript
    const _describedAnchorAction =
              'return {anchor, description}';

    const node =
              sequenceOf([
                             describedAnchor
                                 .withAction(_describedAnchorAction),
                         ]);

    const combinator =
              sequenceOf([
                             token
                                 .named('token'),
                             underscore,
                             node
                                 .named('node'),
                             spaceNode
                                 .withAction('return null'),
                         ]);
    // language=JavaScript
    const action     =
              `
                  return toSpwItem({
                                       token:       token,
                                       position:    'open',
                                       label:       node.anchor,
                                       description: node.description,
                                       kind:        '${delimiter.kind}'
                                   })
              `;
    return combinator.withAction(action);
}
function closer(delimiter: IDelimiter): SequenceCombinator {
    const token =
              stringLike(delimiter.token);

    const underscore =
              stringLike('_');

    const node =
              anyOf([
                        anchorNode,
                    ]);

    const pattern1 =
              sequenceOf([
                             token
                                 .named('token'),
                             underscore,
                             node
                                 .named('node'),
                         ]);

    const pattern2 =
              sequenceOf([
                             node
                                 .named('node'),
                             underscore,
                             token
                                 .named('token'),
                         ]);

    const _patternAction =
              // language=JavaScript
              `
                  return toSpwItem({
                                       token:    token,
                                       position: 'close',
                                       label:    node,
                                       kind:     '${delimiter.kind}'
                                   })
              `;
    return anyOf([
                     pattern1
                         .withAction(_patternAction),
                     pattern2
                         .withAction(_patternAction),
                 ]);
}
export type IDelimiter = { token: string, kind: string };

function plain(delimiter: IDelimiter, index: 'open' | 'close') {
    return sequenceOf([stringLike(delimiter.token).named('tok')])
        // language=JavaScript
        .withAction(
            `return toSpwItem({
                                  token:    tok,
                                  position: '${index}',
                                  kind:     '${delimiter.kind}'
                              })`,
        );
}
export function createDelimiterRule(ruleName: string, delimiter: IDelimiter, index: 'open' | 'close' = 'open'): Rule {
    const reverse                    = index !== 'open';
    const {ruleName: name}           = getContainerNodeComponentReferences(ruleName)[index];
    const plainDelimiterCombinator   = plain(delimiter, index);
    const labeledDelimiterCombinator = !reverse ? opener(delimiter)
                                                : closer(delimiter);
    return new Rule(name, anyOf([
                                    labeledDelimiterCombinator,
                                    plainDelimiterCombinator,
                                ]));
}
