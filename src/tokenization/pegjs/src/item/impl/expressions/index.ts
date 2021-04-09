import {RuleReferencePattern} from '@spwashi/language/parsers/grammar/pattern/sub/rule-reference';
import {Rule} from '@spwashi/language/parsers/grammar/rules/rule';
import {strandExpressionRule, strandExpressionRulePattern} from './strand/rule';

export const getExpressionPatternList = (): RuleReferencePattern[] => {
    return [
        strandExpressionRulePattern,
    ]
}

export const getExpressionRuleList = (): Rule[] => {
    return [
        strandExpressionRule,
    ]
}