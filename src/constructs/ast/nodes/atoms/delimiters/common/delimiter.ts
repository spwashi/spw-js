import {staticImplements} from '@constructs/ast/_util/typescript/staticImplements';
import {ISpwConstructStatic, ConstructComponents} from '@constructs/ast/_abstract/spwConstruct';
import {SpwDelimiter} from '@constructs/ast/nodes/atoms/delimiters/_abstract/delimiter';
import {operatorComponents} from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type CommonDelimiterToken = ',';

@staticImplements<ISpwConstructStatic<'common_delimiter'>>()
export class CommonDelimiter extends SpwDelimiter<'common_delimiter'> {
    static kind: 'common_delimiter'      = 'common_delimiter';

    static token: CommonDelimiterToken   = ',';

    static components: ConstructComponents = operatorComponents(CommonDelimiter);
}