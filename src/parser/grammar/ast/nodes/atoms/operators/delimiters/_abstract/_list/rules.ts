import { blockDelimiterRule } from '@grammar/ast/nodes/atoms/operators/delimiters/block_delimiter/rule';
import { commonDelimiterRule } from '@grammar/ast/nodes/atoms/operators/delimiters/common_delimiter/rule';
import { operatorDelimiterRule } from '@grammar/ast/nodes/atoms/operators/delimiters/node_delimiter/rule';

export const delimiterRules = [blockDelimiterRule, commonDelimiterRule, operatorDelimiterRule];
