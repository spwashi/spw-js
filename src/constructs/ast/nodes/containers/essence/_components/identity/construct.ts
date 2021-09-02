import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { EssentialIdentityToken } from '@constructs/ast/nodes/containers/essence/_components/scheme/__types';
import { EssentialIdentityKind } from '@constructs/ast/nodes/containers/essence/_components/identity/__types';

type StaticType = IConstructClass<EssentialIdentityKind> &
  ITokenOperatorClass<EssentialIdentityToken>;

@staticImplements<StaticType>()
export class EssentialIdentityOperator extends Delimiter<EssentialIdentityKind> {
  static kind: EssentialIdentityKind = 'essence_identity';

  static token: EssentialIdentityToken = ']';

  static components: ConstructComponents = operatorComponents(EssentialIdentityOperator);
}
