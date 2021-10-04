import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { EssentialSchemeToken } from '@constructs/ast/nodes/containers/essence/_components/identity/__types';
import { EssentialSchemeKind } from '@constructs/ast/nodes/containers/essence/_components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<EssentialSchemeKind> & ITokenOperatorClass<EssentialSchemeToken>;

@staticImplements<StaticType>()
export class EssenceSchemeOperator extends Delimiter<EssentialSchemeKind> {
  static kind: EssentialSchemeKind = 'essence_scheme';

  static token: EssentialSchemeToken = '[';

  static components: ConstructComponents = operatorComponents(EssenceSchemeOperator);
}
