import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {createOperationRule} from './common/createOperationRule';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';
import {getActorClause, getPlainClause} from './clauses';

const kind             = 'performance';
const token            = patterns.string('!');
const anchorRuleClause = patterns.rule('PerformanceAnchor', 'label');

const actor = getActorClause(anchorRuleClause, kind);
const plain = getPlainClause(anchorRuleClause, kind);

export const performanceRules =
                 [
                     createOperationRule(token, 'PerformanceAnchor', kind),
                     rule('Performance', patterns.any([actor, plain])),
                 ];