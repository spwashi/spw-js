import { EntityExpression } from '@constructs/ast/expressions/sequences/entity/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = EntityExpression.name;

export const entityExpression = referenceTo(ruleName);
