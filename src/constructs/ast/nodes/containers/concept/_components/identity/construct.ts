import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ConceptConvergenceToken,
  ConceptualIdentityKind,
} from '@constructs/ast/nodes/containers/concept/_components/identity/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ConvergenceOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/convergence/construct';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { Delimiter } from '../../../../operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<ConceptualIdentityKind> &
  ITokenOperatorClass<ConceptConvergenceToken>;

@staticImplements<StaticType>()
export class ConceptIdentityOperator extends Delimiter<ConceptualIdentityKind> {
  static kind: ConceptualIdentityKind = 'concept_identity';

  static token: ConceptConvergenceToken = ConvergenceOperator.token;

  static components: ConstructComponents = operatorComponents(ConceptIdentityOperator);
}
