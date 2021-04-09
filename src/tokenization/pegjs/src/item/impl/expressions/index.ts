import {strandExpressionRule, strandExpressionRulePattern} from './strand/rule';

export const getExpressionPatternList = () => {
    return [
        strandExpressionRulePattern,
    ]
}

export const getExpressionRuleList = () => {
    return [
        strandExpressionRule,
    ]
}