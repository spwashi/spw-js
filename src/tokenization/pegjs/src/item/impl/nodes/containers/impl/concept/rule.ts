import {createContainerRule} from '../../util/createContainerRule';
import {ConceptualNode} from '@constructs/item';
import {ruleName} from './ref';

const tokens: [string, string] = [ConceptualNode.openToken, ConceptualNode.closeToken];
export const conceptDomainRule = createContainerRule(tokens, ConceptualNode.kind, ruleName);
