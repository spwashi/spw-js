import { Domain } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Domain.name;
export const domain = referenceTo(ruleName);
