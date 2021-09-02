import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { LocatedConceptExpression } from '@constructs/ast/expressions/sequence/located_concept/construct';

export const ruleName = LocatedConceptExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const locatedConceptExpression = referenceTo(ruleName);
