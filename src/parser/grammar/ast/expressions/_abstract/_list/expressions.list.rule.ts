import {strandRule} from '../../strand/strand.rule';
import {phraseExpressionRule} from '../../phrase/phrase.rule';
import {expressionRule} from '../expression.rule';
import {perspectiveExpressionRule} from '../../perspective/perspective.rule';

export const expressionRules =
                 [
                     expressionRule,
                     perspectiveExpressionRule,
                     strandRule,
                     phraseExpressionRule,
                 ]