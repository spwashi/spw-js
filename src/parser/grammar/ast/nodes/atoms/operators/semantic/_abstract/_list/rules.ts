import { blockDelimiterRule } from '@grammar/ast/nodes/atoms/operators/semantic/block_delimiter/rule';
import { commonDelimiterRule } from '@grammar/ast/nodes/atoms/operators/semantic/common_delimiter/rule';
import { operatorDelimiterRule } from '@grammar/ast/nodes/atoms/operators/semantic/node_delimiter/rule';

export const delimiterRules = [blockDelimiterRule, commonDelimiterRule, operatorDelimiterRule];
