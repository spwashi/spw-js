import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {whitespacePattern} from './patterns/whitespace';


const action =
          //language=JavaScript
          ` return toSpwItem({kind: 'space'}); `;

const nodeName                    = 'Space';
export const spaceNodeRulePattern = patterns.reference(nodeName);
export const spaceNodeRule        = rule(nodeName, patterns.sequence([patterns.oneOrMore(whitespacePattern).named('newlines')])
                                                    .withAction(action));
