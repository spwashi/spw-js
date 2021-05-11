import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {SpwDelimiter} from '@constructs/ast/nodes/atoms/delimiters/_abstract/delimiter';

type BlockDelimiterToken = ';';

@staticImplements<ISpwItemStatic<'block_delimiter'>>()
export class BlockDelimiter extends SpwDelimiter<'block_delimiter'> {
    static kind: 'block_delimiter'    = 'block_delimiter';
    static token: BlockDelimiterToken = ';';
}