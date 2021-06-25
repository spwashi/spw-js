import { Location } from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { getContainerNodeComponentReferences } from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';

export const ruleName = Location.name;
export const group = combinators.referenceTo(ruleName);

export const groupComponents = getContainerNodeComponentReferences(ruleName);
