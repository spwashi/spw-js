import { LocatedEntityExpression } from '@constructs/ast/expressions/sequence/located_entity/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = LocatedEntityExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const locatedEntityExpression = referenceTo(ruleName);
