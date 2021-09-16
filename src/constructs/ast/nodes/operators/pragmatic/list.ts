import { Operator } from '@constructs/ast/nodes/operators/_abstract/operator';
import { multiTokenOperators } from './multi-token/list';
import { singleTokenOperators } from './single-token/list';

export const pragmaticOperators: typeof Operator[] = [
  ...multiTokenOperators,
  ...singleTokenOperators,
];
