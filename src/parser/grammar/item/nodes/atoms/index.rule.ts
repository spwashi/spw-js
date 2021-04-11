import labeledNodeRules from './labeled/rules';
import {pureAtomNodeRules} from './pure/list.rule';

export const atomNodeRules = [...pureAtomNodeRules, ...labeledNodeRules];
