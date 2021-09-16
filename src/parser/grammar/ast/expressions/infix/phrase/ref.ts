import { PhraseExpression } from '@constructs/ast';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = PhraseExpression.name;
export const phraseExpression = referenceTo(ruleName);
