import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { EntityExpression } from '@constructs/ast/expressions/sequence/entity/construct';

export const ruleName = EntityExpression.name;

export const entityExpression = referenceTo(ruleName);
