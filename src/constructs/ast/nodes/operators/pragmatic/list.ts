import { multiTokenOperators } from './multi-token/list';
import { singleTokenOperators } from './single-token/list';
import { Operator } from '@constructs/ast/nodes/operators/_abstract/operator';

export const pragmaticOperators: typeof Operator[] = [
  ...multiTokenOperators,
  ...singleTokenOperators,
];
