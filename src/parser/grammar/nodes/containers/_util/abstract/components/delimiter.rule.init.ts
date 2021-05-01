import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {SequenceCombinator, StringCombinator} from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anchorNode} from '../../../../atoms/pure/anchor/anchor.ref';
import {containerNodes} from '../../../_list.ref';
import {getContainerNodeComponentReferences} from '../container.ref.init';
import {spaceNode} from '../../../../../_base/space/space.ref';

function opener(token: combinators.StringCombinator): combinators.SequenceCombinator {
    const underscore            = combinators.stringLike('_');
    const headAnchor            = combinators.anyOf([anchorNode, ...containerNodes]);
    const headDescription       = combinators.optionally(combinators.sequenceOf([combinators.anyOf(containerNodes)]));
    const describedAnchor       = combinators.sequenceOf([headAnchor.named('anchor'), headDescription.named('description')]);
    // language=JavaScript
    const describedAnchorAction = 'return {anchor, description}';
    const node                  = combinators.sequenceOf([describedAnchor.withAction(describedAnchorAction)]);
    const combinator            = combinators.sequenceOf([
                                                             token.named('token'),
                                                             underscore,
                                                             node.named('node'),
                                                             spaceNode.withAction('return null'),
                                                         ]);
    // language=JavaScript
    const action                = `return toSpwItem({
                                                        token:    token,
                                                        position: 'open',
                                                        label:    node,
                                                        kind:     'delimiter'
                                                    })`;
    return combinator.withAction(action);
}
function closer(token: StringCombinator): SequenceCombinator {
    const underscore = combinators.stringLike('_');
    const action     = // language=JavaScript
              `return toSpwItem({
                                    token:    token,
                                    position: 'close',
                                    label:    node,
                                    kind:     'delimiter'
                                })`;
    const node       = combinators.anyOf([anchorNode]);
    const combinator = combinators.sequenceOf([node.named('node'), underscore, token.named('token')]);
    return combinator.withAction(action);
}
export function createDelimiterRule(ruleName: string, tok_1: string, index: 'open' | 'close' = 'open'): Rule {
    const reverse                    = index !== 'open';
    const {ruleName: name}           = getContainerNodeComponentReferences(ruleName)[index];
    const tokenCombinator            = combinators.stringLike(tok_1);
    const plainDelimiterCombinator   = combinators.sequenceOf([tokenCombinator.named('tok')])
                                                  .withAction( // language=JavaScript
                                                      `return toSpwItem({
                                                                            token:    tok,
                                                                            position: '${index}',
                                                                            kind:     'delimiter'
                                                                        })`,
                                                  );
    const labeledDelimiterCombinator = !reverse ? opener(tokenCombinator)
                                                : closer(tokenCombinator);
    return new Rule(name, combinators.anyOf([labeledDelimiterCombinator, plainDelimiterCombinator]));
}
