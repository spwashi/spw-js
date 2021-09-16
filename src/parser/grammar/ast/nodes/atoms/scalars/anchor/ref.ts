import { AnchorNode } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = AnchorNode.name;
export const anchorNode = referenceTo(ruleName);
