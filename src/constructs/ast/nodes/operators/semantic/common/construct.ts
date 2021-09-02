import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import {
  CommonDelimiterToken,
  CommonDelimitingOperatorKind,
} from '@constructs/ast/nodes/operators/semantic/common/__types';

@staticImplements<IConstructClass<CommonDelimitingOperatorKind>>()
export class CommonDelimitingOperator extends Delimiter<CommonDelimitingOperatorKind> {
  static kind: CommonDelimitingOperatorKind = 'common_delimiter';

  static token: CommonDelimiterToken = ',';

  static components: ConstructComponents = operatorComponents(CommonDelimitingOperator);
}
