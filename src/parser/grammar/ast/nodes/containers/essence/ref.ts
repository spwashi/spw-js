import { Essence } from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import { getContainerNodeComponentReferences } from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';

export const ruleName = Essence.name;
export const essence = combinators.referenceTo(ruleName);

export const essenceComponents = getContainerNodeComponentReferences(ruleName);
