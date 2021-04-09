import {EssentialNode} from '@constructs/item';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const ruleName           = EssentialNode.name;
export const essenceRulePattern = patterns.reference(ruleName);