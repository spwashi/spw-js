import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Delimiter } from '../../../../operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import {
  DomainIdentityOperatorKind,
  DomainIdentityToken,
} from '@constructs/ast/nodes/containers/domain/_components/identity/__types';

type StaticType = IConstructClass<DomainIdentityOperatorKind> &
  ITokenOperatorClass<DomainIdentityToken>;

@staticImplements<StaticType>()
export class DomainIdentityOperator extends Delimiter<DomainIdentityOperatorKind> {
  static kind: DomainIdentityOperatorKind = 'domain_identity';

  static token: DomainIdentityToken = '}';

  static components: ConstructComponents = operatorComponents(DomainIdentityOperator);
}
