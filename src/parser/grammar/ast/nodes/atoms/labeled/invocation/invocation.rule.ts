import {InvocationAtom} from '@constructs/ast';
import {getLabeledAtomRule} from '../_abstract/_util/labeled_atom.rule.init';

export const invocationNodeRule = getLabeledAtomRule(InvocationAtom);
