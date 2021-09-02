import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { BehaviorExpression } from '@constructs/ast/expressions/sequence/behavior/construct';

export const ruleName = BehaviorExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const behaviorExpression = referenceTo(ruleName);
