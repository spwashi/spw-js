import {ruleName} from './strand_expression.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, oneOrMoreOf, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {phraseExpression} from '../phrase/phrase_expression.ref';
import {spaceNode} from '../../_base/space/space.ref';
import {StrandExpression} from '@constructs/ast';
import {perspectiveExpression} from '@grammar/expressions/perspective/perspective_expression.ref';
import {node} from '@grammar/nodes/abstract/ref';

const head               = anyOf([
                                     perspectiveExpression,
                                     phraseExpression,
                                     node,
                                 ]);
const transport          = stringLike('=>');
const tailEnd            = anyOf([node]);
const tailSequenceAction = /* language=JavaScript */ `
    return {tail, transport}
`;
const tails              = sequenceOf([
                                          zeroOrMoreOf(spaceNode),
                                          transport.named('transport'),
                                          zeroOrMoreOf(spaceNode),
                                          tailEnd.named('tail'),
                                      ]).withAction(tailSequenceAction);
const pattern            = sequenceOf([
                                          head.named('head'),
                                          zeroOrMoreOf(spaceNode),
                                          oneOrMoreOf(tails).named('tails'),
                                      ]);
const action             = /* language=JavaScript */ `
    return toSpwItem({
                         kind: '${StrandExpression.kind}',
                         head,
                         tails,
                     })`;

export const strandExpressionRule = new Rule(ruleName, pattern, action)