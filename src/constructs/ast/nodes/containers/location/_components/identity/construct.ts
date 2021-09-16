import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  LocationIdentityOperatorKind,
  LocationIdentityOperatorToken,
} from '@constructs/ast/nodes/containers/location/_components/identity/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';

type StaticType = IConstructClass<LocationIdentityOperatorKind> &
  ITokenOperatorClass<LocationIdentityOperatorToken>;

@staticImplements<StaticType>()
export class LocationalIdentityOperator extends Delimiter<LocationIdentityOperatorKind> {
  static kind: LocationIdentityOperatorKind = 'location_identity';

  static token: LocationIdentityOperatorToken = ')';

  static components: ConstructComponents = operatorComponents(LocationalIdentityOperator);
}
