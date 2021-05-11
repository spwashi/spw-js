import {anchorRule} from '../../anchor/rule';
import {phraseNodeRule} from '../../phrase/rule';
import {stringNodeRule} from '../../string/rule';
import {scalarRule} from '../scalar.rule';
import {numberRule} from '../../number/rule';

export default [
    anchorRule,
    numberRule,
    phraseNodeRule,
    stringNodeRule,
    scalarRule,
]