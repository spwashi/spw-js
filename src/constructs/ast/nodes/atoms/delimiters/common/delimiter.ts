import {staticImplements} from '@constructs/ast/_util/staticImplements';
import {ISpwItemStatic} from '@constructs/ast/_abstract/item';
import {SpwDelimiter} from '@constructs/ast/nodes/atoms/delimiters/_abstract/delimiter';

type CommonDelimiterToken = ',';

@staticImplements<ISpwItemStatic<'common_delimiter'>>()
export class CommonDelimiter extends SpwDelimiter<'common_delimiter'> {
    static kind: 'common_delimiter'    = 'common_delimiter';
    static token: CommonDelimiterToken = ',';
}