import {GroupNode} from '@constructs/item';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const ruleName         = GroupNode.name;
export const groupRulePattern = patterns.reference(ruleName);