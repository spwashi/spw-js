import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  LocationIdentityOperatorKind,
  LocationIdentityOperatorToken,
} from '@constructs/ast/nodes/containers/location/components/identity/__types';

type StaticType = IConstructClass<LocationIdentityOperatorKind> &
  ITokenOperatorClass<LocationIdentityOperatorToken>;

@staticImplements<StaticType>()
export class LocationalIdentityOperator extends Delimiter<LocationIdentityOperatorKind> {
  static kind: LocationIdentityOperatorKind = 'group_identity';

  static token: LocationIdentityOperatorToken = ')';

  static components: ConstructComponents = operatorComponents(LocationalIdentityOperator);
}
