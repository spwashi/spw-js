import { PhraseNode } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PhraseNode.name;
export const phraseNode = referenceTo(ruleName);
