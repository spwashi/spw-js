import {strandExpressionRule} from '../../strand/strand.expression.rule';
import {phraseExpressionRule} from '../../phrase/phrase.expression.rule';
import {expressionRule} from '../expression.rule';
import {perspectiveExpressionRule} from '../../perspective/perspective.expression.rule';

export const expressionRules =
                 [
                     expressionRule,
                     perspectiveExpressionRule,
                     strandExpressionRule,
                     phraseExpressionRule,
                 ]