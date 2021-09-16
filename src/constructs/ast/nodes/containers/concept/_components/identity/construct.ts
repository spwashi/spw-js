import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ConceptConvergenceToken,
  ConceptualIdentityOperatorKind,
} from '@constructs/ast/nodes/containers/concept/_components/identity/__types';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { ConvergenceOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/convergence/construct';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { Delimiter } from '../../../../operators/semantic/_abstract/delimiter';

type StaticType = IConstructClass<ConceptualIdentityOperatorKind> &
  ITokenOperatorClass<ConceptConvergenceToken>;

@staticImplements<StaticType>()
export class ConceptualIdentityOperator extends Delimiter<ConceptualIdentityOperatorKind> {
  static kind: ConceptualIdentityOperatorKind = 'concept_identity';

  static token: ConceptConvergenceToken = ConvergenceOperator.token;

  static components: ConstructComponents = operatorComponents(ConceptualIdentityOperator);
}
