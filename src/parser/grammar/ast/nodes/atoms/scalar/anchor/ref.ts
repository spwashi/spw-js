import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { AnchorNode } from '@constructs/ast';

export const ruleName = AnchorNode.name;
export const anchorNode = combinators.referenceTo(ruleName);
