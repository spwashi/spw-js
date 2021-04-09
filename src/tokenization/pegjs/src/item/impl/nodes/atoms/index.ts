import {anchorRule} from './pure/impl/anchor/anchor.rule';
import {unicodeRule} from '../../../../utility/unicode';
import {phraseNodeRule} from './pure/impl/phrase/phrase.rule';
import {stringNodeRule} from './pure/impl/string/string.rule';
import labeledNodeRules from './labeled';
import {pureAtomNodeRulePattern, pureAtomRule} from './pure';
import {labeledAtomNodeRulePattern} from './labeled/abstract/ref';
import { Rule } from '@spwashi/language/parsers/grammar/rules/rule';
import { RuleReferencePattern } from '@spwashi/language/parsers/grammar/pattern/sub/rule-reference';

export const getAtomRuleList =
                 (): Rule[] => {
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
                 (): RuleReferencePattern[] => {
                     return [
                         pureAtomNodeRulePattern,
                         labeledAtomNodeRulePattern,
                     ]
                 }