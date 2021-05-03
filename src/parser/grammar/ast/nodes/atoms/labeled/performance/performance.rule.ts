import {PerformanceAtom} from '@constructs/ast';
import {getLabeledAtomRule} from '../_abstract/_util/labeled_atom.rule.init';

export const performanceNodeRule = getLabeledAtomRule(PerformanceAtom);