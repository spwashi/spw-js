import {createContainerRule} from '../../util/createContainerRule';
import {GroupNode} from '@constructs/item';
import {ruleName} from './ref';

const tokens: [string, string] = [GroupNode.openToken, GroupNode.closeToken];
export const groupRule    = createContainerRule(tokens, GroupNode.kind, ruleName)

