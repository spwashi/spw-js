import {referenceTo} from '@spwashi/language/parsers/grammar/combinators';
import {Concept} from '@constructs/ast';
import {getContainerNodeComponentReferences} from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';

export const ruleName = Concept.name;
export const concept  = referenceTo(ruleName);

export const conceptComponents = getContainerNodeComponentReferences(ruleName);