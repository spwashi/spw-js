import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import {
  LocationSchemeOperatorKind,
  LocationSchemeOperatorToken,
} from '@constructs/ast/nodes/containers/location/components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type StaticType = IConstructClass<LocationSchemeOperatorKind> &
  ITokenOperatorClass<LocationSchemeOperatorToken>;

@staticImplements<StaticType>()
export class LocationalSchemeOperator extends Delimiter<LocationSchemeOperatorKind> {
  static kind: LocationSchemeOperatorKind = 'group_scheme';

  static token: LocationSchemeOperatorToken = '(';

  static components: ConstructComponents = operatorComponents(LocationalSchemeOperator);
}
