import patterns from '@spwashi/language/language/parser-generation/grammar/pattern/sub';
import {createOperationRule} from './common/createOperationRule';
import {rule} from '@spwashi/language/language/parser-generation/grammar/rules/rule';
import {getActorClause, getPlainClause} from './clauses';

const kind             = 'invocation';
const token            = patterns.string('~');
const anchorRuleClause = patterns.rule('InvocationAnchor', 'label');

const actor = getActorClause(anchorRuleClause, kind);
const plain = getPlainClause(anchorRuleClause, kind);

export const invocationRules =
                 [
                     createOperationRule(token, 'InvocationAnchor', kind),
                     rule('Invocation', patterns.any([actor, plain])),
                 ];