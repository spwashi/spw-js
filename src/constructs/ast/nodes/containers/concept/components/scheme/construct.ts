import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '@constructs/ast/_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  ConceptualSchemeOperatorKind,
  ConceptIntroductionOperator,
} from '@constructs/ast/nodes/containers/concept/components/scheme/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';

type StaticType = IConstructClass<ConceptualSchemeOperatorKind> &
  ITokenOperatorClass<ConceptIntroductionOperator>;

@staticImplements<StaticType>()
export class ConceptSchemeOperator extends Delimiter<ConceptualSchemeOperatorKind> {
  static kind: ConceptualSchemeOperatorKind = 'concept_scheme';

  static token: ConceptIntroductionOperator = '<';

  static components: ConstructComponents = operatorComponents(ConceptSchemeOperator);
}
