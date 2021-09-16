import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  CommonDelimiterToken,
  CommonDelimitingOperatorKind,
} from '@constructs/ast/nodes/operators/semantic/common/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<CommonDelimitingOperatorKind>>()
export class CommonDelimitingOperator extends Delimiter<CommonDelimitingOperatorKind> {
  static kind: CommonDelimitingOperatorKind = 'common_delimiter';

  static token: CommonDelimiterToken = ',';

  static components: ConstructComponents = operatorComponents(CommonDelimitingOperator);
}
