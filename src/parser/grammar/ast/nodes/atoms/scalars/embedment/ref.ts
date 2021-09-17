import { EmbedmentNode } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = EmbedmentNode.name;
export const embedmentNode = referenceTo(ruleName);
