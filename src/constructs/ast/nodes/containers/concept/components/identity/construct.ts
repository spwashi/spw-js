import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/atoms/operators/_abstract/_types/atomic';
import { Delimiter } from '../../../../atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  ConceptualIdentityOperatorKind,
  ConceptConvergenceToken,
} from '@constructs/ast/nodes/containers/concept/components/identity/__types';

type StaticType = IConstructClass<ConceptualIdentityOperatorKind> &
  ITokenOperatorClass<ConceptConvergenceToken>;

@staticImplements<StaticType>()
export class ConceptualIdentityOperator extends Delimiter<ConceptualIdentityOperatorKind> {
  static kind: ConceptualIdentityOperatorKind = 'concept_identity';

  static token: ConceptConvergenceToken = '>';

  static components: ConstructComponents = operatorComponents(ConceptualIdentityOperator);
}
