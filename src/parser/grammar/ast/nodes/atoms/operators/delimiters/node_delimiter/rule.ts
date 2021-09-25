import { NodeDelimiter } from '@constructs/ast/nodes/operators/semantic/node/construct';
import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const operatorDelimiterRule = getOperatorRule(NodeDelimiter);
