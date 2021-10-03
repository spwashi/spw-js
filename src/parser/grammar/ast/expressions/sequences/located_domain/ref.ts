import { LocatedDomainExpression } from '@constructs/ast/expressions/sequence/behavior/sub/located_domain/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = LocatedDomainExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const locatedDomainExpression = referenceTo(ruleName);
