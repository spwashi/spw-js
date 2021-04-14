import {phraseNode} from './phrase/phrase.ref';
import {anchorNode} from './anchor/anchor.ref';
import {stringNode} from './string/string.ref';
import {numberNode} from './number/number.ref';

export const pureAtomNodes =
                 [
                     phraseNode,
                     stringNode,
                     numberNode,
                     anchorNode,
                 ];