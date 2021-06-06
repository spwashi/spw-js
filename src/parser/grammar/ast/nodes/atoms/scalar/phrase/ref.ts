import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { PhraseNode } from '@constructs/ast';

export const ruleName = PhraseNode.name;
export const phraseNode = combinators.referenceTo(ruleName);
