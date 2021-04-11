import {InvocationNode} from '@constructs/ast';
import {getLabeledAtomRule} from '../_util/labeled_atom.rule.init';

export const invocationNodeRule = getLabeledAtomRule(InvocationNode);
