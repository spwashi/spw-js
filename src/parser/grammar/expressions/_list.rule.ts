import {strandExpressionRule} from './strand/strand_expression.rule';
import {phraseExpressionRule} from './phrase/phrase_expression.rule';
import {expressionRule} from './abstract/rule';

export const expressionRules =
                 [
                     expressionRule,
                     strandExpressionRule,
                     phraseExpressionRule,
                 ]