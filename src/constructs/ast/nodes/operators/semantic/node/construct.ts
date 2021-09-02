import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import {
  OperatorDelimitingOperatorToken,
  OperatorDelimitingOperatorKind,
} from '@constructs/ast/nodes/operators/semantic/node/__types';

@staticImplements<IConstructClass<OperatorDelimitingOperatorKind>>()
export class NodeDelimitingOperator extends Delimiter<OperatorDelimitingOperatorKind> {
  static kind: OperatorDelimitingOperatorKind = 'operator_delimiter';

  static token: OperatorDelimitingOperatorToken = ' ';

  static components: ConstructComponents = operatorComponents(NodeDelimitingOperator);
}
