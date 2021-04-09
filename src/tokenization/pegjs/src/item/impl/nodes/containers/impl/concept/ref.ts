import patterns from '@spwashi/language/parsers/grammar/pattern/sub';
import {ConceptualNode} from '@constructs/item';

export const ruleName           = ConceptualNode.name;
export const conceptRulePattern = patterns.reference(ruleName);