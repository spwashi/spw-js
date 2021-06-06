import { strandRule } from '../../relational/strand/rule';
import { phraseExpressionRule } from '../../relational/phrase/rule';
import { expressionRule } from '../expression.rule';
import { perspectiveExpressionRule } from '../../operational/perspective/rule';

export const expressionRules = [
  expressionRule,
  perspectiveExpressionRule,
  strandRule,
  phraseExpressionRule,
];
