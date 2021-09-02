import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { referenceTo } from '@spwashi/language/parsers/grammar/combinators';

export const ruleName = Delimiter.name;
export const delimiter = referenceTo(ruleName);
