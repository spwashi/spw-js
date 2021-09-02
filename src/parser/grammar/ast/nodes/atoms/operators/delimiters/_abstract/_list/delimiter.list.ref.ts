import { blockDelimitingOperator } from '@grammar/ast/nodes/atoms/operators/delimiters/block/ref';
import { commonDelimitingOperator } from '@grammar/ast/nodes/atoms/operators/delimiters/common/ref';
import { nodeDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/operator/ref';

export const semanticOperators = [blockDelimitingOperator, commonDelimitingOperator, nodeDelimiter];
