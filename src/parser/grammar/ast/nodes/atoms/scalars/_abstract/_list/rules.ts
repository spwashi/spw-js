import { identifierNodeRule } from '../../identifier/rule';
import { embedmentNodeRule } from '../../embedment/rule';
import { numberRule } from '../../number/rule';
import { phraseNodeRule } from '../../phrase/rule';
import { stringNodeRule } from '../../string/rule';
import { scalarRule } from '../scalar.rule';

export const scalarRules = [
  identifierNodeRule,
  embedmentNodeRule,
  numberRule,
  phraseNodeRule,
  scalarRule,
  stringNodeRule,
];
