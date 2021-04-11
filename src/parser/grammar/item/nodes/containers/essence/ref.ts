import {EssentialNode} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';

export const ruleName    = EssentialNode.name;
export const essenceRule = combinators.referenceTo(ruleName);