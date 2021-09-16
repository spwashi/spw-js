import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  LocationSchemeOperatorKind,
  LocationSchemeOperatorToken,
} from '@constructs/ast/nodes/containers/location/_components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<LocationSchemeOperatorKind> &
  ITokenOperatorClass<LocationSchemeOperatorToken>;

@staticImplements<StaticType>()
export class LocationalSchemeOperator extends Delimiter<LocationSchemeOperatorKind> {
  static kind: LocationSchemeOperatorKind = 'location_scheme';

  static token: LocationSchemeOperatorToken = '(';

  static components: ConstructComponents = operatorComponents(LocationalSchemeOperator);
}
