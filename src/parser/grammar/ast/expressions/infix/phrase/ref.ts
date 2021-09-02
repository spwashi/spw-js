import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';
import { PhraseExpression } from '@constructs/ast';

export const ruleName = PhraseExpression.name;
export const phraseExpression = referenceTo(ruleName);
