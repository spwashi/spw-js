import { operatorRule } from '@grammar/ast/nodes/atoms/operators/_abstract/operator.rule';
import { pragmaticOperatorRules } from '../../pragmatic/_abstract/_list/rules';

export const operatorRules = [operatorRule, ...pragmaticOperatorRules];
