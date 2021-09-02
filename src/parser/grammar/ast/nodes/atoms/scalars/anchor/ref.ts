import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { AnchorNode } from '@constructs/ast';

export const ruleName = AnchorNode.name;
export const anchorNode = referenceTo(ruleName);
