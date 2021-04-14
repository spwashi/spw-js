import {anchorRule} from './anchor/anchor.rule';
import {phraseNodeRule} from './phrase/phrase.rule';
import {stringNodeRule} from './string/string.rule';
import {pureAtomRule} from './abstract/rule';
import {numberRule} from './number/number.rule';

export default [
    anchorRule,
    numberRule,
    phraseNodeRule,
    stringNodeRule,
    pureAtomRule,
]