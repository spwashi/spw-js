import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { LocatedEssenceExpression } from '@constructs/ast/expressions/sequence/located_essence/construct';

export const ruleName = LocatedEssenceExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const locatedEssenceExpression = referenceTo(ruleName);
