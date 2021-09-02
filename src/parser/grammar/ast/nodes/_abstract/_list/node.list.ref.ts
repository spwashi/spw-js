import { scalars } from '@grammar/ast/nodes/atoms/scalars/_abstract/_list/scalar.list.ref';
import { pragmaticOperators } from '@grammar/ast/nodes/atoms/operators/_abstract/_list/operator.list.ref';
import { semanticOperators } from '@grammar/ast/nodes/atoms/operators/delimiters/_abstract/_list/delimiter.list.ref';

/**
 * Represent a self-contained unit of description.
 *
 * - Scalars {@see scalars}
 */
export const nodes = [...scalars];

/**
 * Nodes that represent theoretical operations
 */
export const abstractNodes = [...pragmaticOperators, ...semanticOperators];
