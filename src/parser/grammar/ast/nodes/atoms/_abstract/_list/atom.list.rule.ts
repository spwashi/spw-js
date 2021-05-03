import labeledAtomNodeRules from '../../operators/_abstract/_list/operator.list.rule';
import pureAtomNodeRules from '../../scalar/_abstract/_list/scalar.list.rule';
import {atomRule} from '../atom.rule';

export const atomNodeRules =
                 [
                     atomRule,
                     ...pureAtomNodeRules,
                     ...labeledAtomNodeRules,
                 ];
