import {createContainerRule} from '../../util/createContainerRule';
import {DomainNode} from '@constructs/item';
import {ruleName} from './ref';

const tokens: [string, string] = [DomainNode.openToken, DomainNode.closeToken];
export const domainRule        = createContainerRule(tokens, DomainNode.kind, ruleName);
