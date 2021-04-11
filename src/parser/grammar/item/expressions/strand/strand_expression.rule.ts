import {labeledAtomNode} from '../../nodes/atoms/labeled/abstract/ref';
import {ruleName} from './strand_expression.ref';
import {Rule} from '@spwashi/language/parsers/grammar';
import {anyOf, oneOrMoreOf, sequenceOf, stringLike, zeroOrMoreOf} from '@spwashi/language/parsers/grammar/combinators';
import {pureAtomNode} from '../../nodes/atoms/pure/abstract/ref';
import {phraseExpression} from '../phrase/phrase_expression.ref';
import {spaceNode} from '../../../_base/space/space.ref';
import {nodes} from '../../nodes/_list.ref';

const head               = anyOf([phraseExpression, labeledAtomNode, pureAtomNode]);
const transport          = stringLike('=>');
const tailEnd            = anyOf([...nodes]);
const tailSequenceAction = /* language=JavaScript */ `
    return toSpwItem({
                         kind: 'strand-tail',
                         tail,
                         transport,
                         key:  transport + tail.key
                     })
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
                         kind: 'strand',
                         head,
                         tails,
                         key:  [head.key, tails.map(i => i.key).join('')].join('')
                     })`;

export const strandExpressionRule = new Rule(ruleName, pattern, action)