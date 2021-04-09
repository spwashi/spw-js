import {anchorRule} from './pure/impl/anchor/anchor.rule';
import {unicodeRule} from '../../../../utility/unicode';
import {phraseNodeRule} from './pure/impl/phrase/phrase.rule';
import {stringNodeRule} from './pure/impl/string/string.rule';
import labeledNodeRules from './labeled';
import {pureAtomNodeRulePattern, pureAtomRule} from './pure';
import {labeledAtomNodeRulePattern} from './labeled/abstract/ref';

export const getAtomRuleList =
                 () => {
                     return [
                         phraseNodeRule,
                         unicodeRule,
                         anchorRule,
                         stringNodeRule,
                         pureAtomRule,
                         ...labeledNodeRules(),
                     ]
                 }

export const getAtomNodePatternList =
                 () => {
                     return [
                         pureAtomNodeRulePattern,
                         labeledAtomNodeRulePattern,
                     ]
                 }