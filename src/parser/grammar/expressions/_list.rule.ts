import {strandExpressionRule} from './strand/strand_expression.rule';
import {phraseExpressionRule} from './phrase/phrase_expression.rule';
import {expressionRule} from './abstract/rule';
import {perspectiveExpressionRule} from './perspective/perspective_expression.rule';

export const expressionRules =
                 [
                     expressionRule,
                     perspectiveExpressionRule,
                     strandExpressionRule,
                     phraseExpressionRule,
                 ]