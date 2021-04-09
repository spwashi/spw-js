import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {stringNodeRulePattern} from './impl/string/string.rule';
import {anchorNodeRulePattern} from './impl/anchor/anchor.ref';
import {phraseNodeRulePattern} from './impl/phrase/phrase.ref';

const ruleName               = 'PureAtom';
export const pureAtomRule            = rule(ruleName, patterns.any([phraseNodeRulePattern, anchorNodeRulePattern, stringNodeRulePattern]))
export const pureAtomNodeRulePattern = patterns.reference(ruleName);