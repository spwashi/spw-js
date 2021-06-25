import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import { EssentialSchemeToken } from '@constructs/ast/nodes/containers/essence/components/identity/__types';
import { EssentialSchemeKind } from '@constructs/ast/nodes/containers/essence/components/scheme/__types';

type StaticType = IConstructClass<EssentialSchemeKind> & ITokenOperatorClass<EssentialSchemeToken>;

@staticImplements<StaticType>()
export class EssentialSchemeOperator extends Delimiter<EssentialSchemeKind> {
  static kind: EssentialSchemeKind = 'essence_scheme';

  static token: EssentialSchemeToken = '[';

  static components: ConstructComponents = operatorComponents(EssentialSchemeOperator);
}
