import { behaviorExpression } from '@grammar/ast/expressions/sequences/behavior/ref';
import { entityExpression } from '@grammar/ast/expressions/sequences/entity/ref';
import { instanceExpression } from '@grammar/ast/expressions/sequences/instance/ref';

/**
 * Reference ArrayExpressions that are based on a specific sequence of constructs
 */
export const sequenceExpressions = [instanceExpression, entityExpression, behaviorExpression];
