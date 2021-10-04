import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  DomainIdentityKind,
  DomainIdentityToken,
} from '@constructs/ast/nodes/containers/domain/_components/identity/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { Delimiter } from '../../../../operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<DomainIdentityKind> & ITokenOperatorClass<DomainIdentityToken>;

@staticImplements<StaticType>()
export class DomainIdentityOperator extends Delimiter<DomainIdentityKind> {
  static kind: DomainIdentityKind = 'domain_identity';

  static token: DomainIdentityToken = '}';

  static components: ConstructComponents = operatorComponents(DomainIdentityOperator);
}
