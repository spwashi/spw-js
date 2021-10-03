import { LocatedEssenceExpression } from '@constructs/ast/expressions/sequence/behavior/sub/located_essence/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = LocatedEssenceExpression.name;

/**
 * Node Expression rule reference.
 *
 * A sequence of nodes that can be combined to form one "concept"
 */
export const locatedEssenceExpression = referenceTo(ruleName);
