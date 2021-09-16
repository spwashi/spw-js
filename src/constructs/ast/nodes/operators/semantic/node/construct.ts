import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  OperatorDelimitingOperatorKind,
  OperatorDelimitingOperatorToken,
} from '@constructs/ast/nodes/operators/semantic/node/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<OperatorDelimitingOperatorKind>>()
export class NodeDelimitingOperator extends Delimiter<OperatorDelimitingOperatorKind> {
  static kind: OperatorDelimitingOperatorKind = 'operator_delimiter';

  static token: OperatorDelimitingOperatorToken = ' ';

  static components: ConstructComponents = operatorComponents(NodeDelimitingOperator);
}
