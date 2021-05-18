import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/construct';
import {SpwDelimiter} from '@constructs/ast/nodes/atoms/delimiters/_abstract/delimiter';
import {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type BlockDelimiterToken = ';';

@staticImplements<ISpwConstructStatic<'block_delimiter'>>()
export class BlockDelimiter extends SpwDelimiter<'block_delimiter'> {
    static kind: 'block_delimiter'       = 'block_delimiter';

    static token: BlockDelimiterToken    = ';';

    static components: ConstructComponents = operatorComponents(BlockDelimiter);
}