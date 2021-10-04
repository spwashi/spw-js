import { CommonExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = CommonExpression.name;

export const commonExpression = referenceTo(ruleName);
