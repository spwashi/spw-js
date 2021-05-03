import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {Rule} from '@spwashi/language/parsers/grammar';
import {whitespaceCombinator} from './whitespace.patterns';
import {nodeName} from './space.ref';


const action = /* language=JavaScript */ `return toSpwItem({kind: 'space'});`;

export const spaceNodeRule = new Rule(nodeName, combinators.sequenceOf([combinators.oneOrMoreOf(whitespaceCombinator).named('newlines')])
                                                           .withAction(action));
