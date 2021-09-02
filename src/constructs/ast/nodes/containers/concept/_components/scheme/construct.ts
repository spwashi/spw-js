import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import {
  ConceptualSchemeOperatorKind,
  ConceptIntroductionOperator,
} from '@constructs/ast/nodes/containers/concept/_components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { DivergenceOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/divergence/construct';

type StaticType = IConstructClass<ConceptualSchemeOperatorKind> &
  ITokenOperatorClass<ConceptIntroductionOperator>;

@staticImplements<StaticType>()
export class ConceptSchemeOperator extends Delimiter<ConceptualSchemeOperatorKind> {
  static kind: ConceptualSchemeOperatorKind = 'concept_scheme';

  static token: ConceptIntroductionOperator = DivergenceOperator.token;

  static components: ConstructComponents = operatorComponents(ConceptSchemeOperator);
}
