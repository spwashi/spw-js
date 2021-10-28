import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  CommonDelimiterToken,
  CommonDelimiterKind,
} from '@constructs/ast/nodes/operators/semantic/common_delimiter/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<CommonDelimiterKind>>()
export class CommonDelimiter extends Delimiter<CommonDelimiterKind> {
  static kind: CommonDelimiterKind = 'common_delimiter';

  static token: CommonDelimiterToken = ',';

  static components: ConstructComponents = operatorComponents(CommonDelimiter);
}
