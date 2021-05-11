import {Domain} from '@constructs/ast';
import * as combinators from '@spwashi/language/parsers/grammar/combinators';
import {getContainerNodeComponentReferences} from '@grammar/ast/nodes/containers/_abstract/_util/container.ref.init';

export const ruleName = Domain.name;
export const domain   = combinators.referenceTo(ruleName);

export const domainComponents = getContainerNodeComponentReferences(ruleName);