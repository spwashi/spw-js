import { Group } from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { getContainerNodeComponentReferences } from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';

export const ruleName = Group.name;
export const group = combinators.referenceTo(ruleName);

export const groupComponents = getContainerNodeComponentReferences(ruleName);
