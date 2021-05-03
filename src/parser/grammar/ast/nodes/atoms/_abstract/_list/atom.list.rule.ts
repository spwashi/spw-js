import labeledAtomNodeRules from '../../labeled/_abstract/_list/labeled_atom.list.rule';
import pureAtomNodeRules from '../../pure/_abstract/_list/pure_atom.list.rule';
import {atomRule} from '../atom.rule';

export const atomNodeRules =
                 [
                     atomRule,
                     ...pureAtomNodeRules,
                     ...labeledAtomNodeRules,
                 ];
