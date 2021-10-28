import { CommonDelimiter } from '@constructs/ast/nodes/operators/semantic/common_delimiter/construct';
import { getOperatorRule } from '@grammar/ast/nodes/atoms/operators/_util/operator.rule.init';

export const commonDelimiterRule = getOperatorRule(CommonDelimiter);
