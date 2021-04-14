import labeledAtomNodeRules from './labeled/rules';
import pureAtomNodeRules from './pure/_list.rule';
import {atomRule} from './abstract/rule';

export const atomNodeRules =
                 [
                     atomRule,
                     ...pureAtomNodeRules,
                     ...labeledAtomNodeRules,
                 ];
