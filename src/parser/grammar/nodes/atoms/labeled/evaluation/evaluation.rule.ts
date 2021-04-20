import {EvaluationAtom} from '@constructs/ast';
import {getLabeledAtomRule} from '../_util/labeled_atom.rule.init';

export const evaluationNodeRule = getLabeledAtomRule(EvaluationAtom);