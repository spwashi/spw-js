import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ConceptIntroductionOperator,
  ConceptualSchemeKind,
} from '@constructs/ast/nodes/containers/concept/_components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { DivergenceOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/divergence/construct';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<ConceptualSchemeKind> &
  ITokenOperatorClass<ConceptIntroductionOperator>;

@staticImplements<StaticType>()
export class ConceptSchemeOperator extends Delimiter<ConceptualSchemeKind> {
  static kind: ConceptualSchemeKind = 'concept_scheme';

  static token: ConceptIntroductionOperator = DivergenceOperator.token;

  static components: ConstructComponents = operatorComponents(ConceptSchemeOperator);
}
