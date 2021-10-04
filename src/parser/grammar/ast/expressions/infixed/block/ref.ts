import { BlockExpression } from '@constructs/ast/expressions/groups/block/construct';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = BlockExpression.name;

export const block = referenceTo(ruleName);
