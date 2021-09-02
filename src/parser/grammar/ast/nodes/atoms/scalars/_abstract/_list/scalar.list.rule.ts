import { anchorNodeRule } from '../../anchor/rule';
import { phraseNodeRule } from '../../phrase/rule';
import { stringNodeRule } from '../../string/rule';
import { scalarRule } from '../scalar.rule';
import { numberRule } from '../../number/rule';

export const scalarRules = [anchorNodeRule, numberRule, phraseNodeRule, stringNodeRule, scalarRule];
