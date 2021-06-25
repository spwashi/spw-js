import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  DomainSchemeOperatorKind,
  DomainSchemeToken,
} from '@constructs/ast/nodes/containers/domain/components/scheme/__types';

type StaticType = IConstructClass<DomainSchemeOperatorKind> &
  ITokenOperatorClass<DomainSchemeToken>;

@staticImplements<StaticType>()
export class DomainSchemeOperator extends Delimiter<DomainSchemeOperatorKind> {
  static kind: DomainSchemeOperatorKind = 'domain_scheme';

  static token: DomainSchemeToken = '{';

  static components: ConstructComponents = operatorComponents(DomainSchemeOperator);
}
