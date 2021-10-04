import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  DomainSchemeKind,
  DomainSchemeToken,
} from '@constructs/ast/nodes/containers/domain/_components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<DomainSchemeKind> & ITokenOperatorClass<DomainSchemeToken>;

@staticImplements<StaticType>()
export class DomainSchemeOperator extends Delimiter<DomainSchemeKind> {
  static kind: DomainSchemeKind = 'domain_scheme';

  static token: DomainSchemeToken = '{';

  static components: ConstructComponents = operatorComponents(DomainSchemeOperator);
}
