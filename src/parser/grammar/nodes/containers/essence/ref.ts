import {EssentialContainer} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName           = EssentialContainer.name;
export const essentialContainer = combinators.referenceTo(ruleName);