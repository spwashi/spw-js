import { pragmaticOperators } from '@constructs/ast/nodes/operators/pragmatic/list';
import { semanticOperators } from '@constructs/ast/nodes/operators/semantic/list';

export const operators = [...pragmaticOperators, ...semanticOperators];
