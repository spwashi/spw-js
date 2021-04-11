import {anchorRule} from './anchor/anchor.rule';
import {phraseNodeRule} from './phrase/phrase.rule';
import {stringNodeRule} from './string/string.rule';
import {pureAtomRule} from './abstract/rule';

export const pureAtomNodeRules =
                 [
                     anchorRule,
                     phraseNodeRule,
                     stringNodeRule,
                     pureAtomRule
                 ]