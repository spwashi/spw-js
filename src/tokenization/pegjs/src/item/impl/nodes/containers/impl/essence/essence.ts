import {createContainerRule} from '../../util/createContainerRule';
import {EssentialNode} from '@constructs/item';
import {ruleName} from './ref';

const tokens: [string, string]   = [EssentialNode.openToken, EssentialNode.closeToken];
export const essenceRule        = createContainerRule(tokens, EssentialNode.kind, ruleName);

