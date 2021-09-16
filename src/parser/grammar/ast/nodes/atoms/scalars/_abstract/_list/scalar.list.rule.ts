import { anchorNodeRule } from '../../anchor/rule';
import { numberRule } from '../../number/rule';
import { phraseNodeRule } from '../../phrase/rule';
import { stringNodeRule } from '../../string/rule';
import { scalarRule } from '../scalar.rule';

export const scalarRules = [anchorNodeRule, numberRule, phraseNodeRule, stringNodeRule, scalarRule];
