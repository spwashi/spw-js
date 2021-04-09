import {DomainNode} from '@constructs/item';
import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const ruleName          = DomainNode.name;
export const domainRulePattern = patterns.reference(ruleName);