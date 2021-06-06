import operatorRules from '../../operator/_abstract/_list/operator.list.rule';
import scalarRules from '../../scalar/_abstract/_list/scalar.list.rule';
import { atomRule } from '../atom.rule';

export const atomNodeRules = [atomRule, ...scalarRules, ...operatorRules];
