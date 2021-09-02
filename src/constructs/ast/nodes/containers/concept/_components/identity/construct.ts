import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { ITokenOperatorClass } from '@constructs/ast/nodes/operators/_abstract/_types/atomic';
import { Delimiter } from '../../../../operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import {
  ConceptualIdentityOperatorKind,
  ConceptConvergenceToken,
} from '@constructs/ast/nodes/containers/concept/_components/identity/__types';
import { ConvergenceOperator } from '@constructs/ast/nodes/operators/pragmatic/single-token/convergence/construct';

type StaticType = IConstructClass<ConceptualIdentityOperatorKind> &
  ITokenOperatorClass<ConceptConvergenceToken>;

@staticImplements<StaticType>()
export class ConceptualIdentityOperator extends Delimiter<ConceptualIdentityOperatorKind> {
  static kind: ConceptualIdentityOperatorKind = 'concept_identity';

  static token: ConceptConvergenceToken = ConvergenceOperator.token;

  static components: ConstructComponents = operatorComponents(ConceptualIdentityOperator);
}
