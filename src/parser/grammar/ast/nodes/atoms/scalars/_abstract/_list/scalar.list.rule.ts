import { embedmentNodeRule } from '@grammar/ast/nodes/atoms/scalars/embedment/rule';
import { anchorNodeRule } from '../../anchor/rule';
import { numberRule } from '../../number/rule';
import { phraseNodeRule } from '../../phrase/rule';
import { stringNodeRule } from '../../string/rule';
import { scalarRule } from '../scalar.rule';

export const scalarRules = [
  anchorNodeRule,
  embedmentNodeRule,
  numberRule,
  phraseNodeRule,
  scalarRule,
  stringNodeRule,
];
