import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  OperatorDelimitingOperatorToken,
  OperatorDelimitingOperatorKind,
} from '@constructs/ast/nodes/atoms/operators/delimiters/operator/__types';

@staticImplements<IConstructClass<OperatorDelimitingOperatorKind>>()
export class OperatorDelimitingOperator extends Delimiter<OperatorDelimitingOperatorKind> {
  static kind: OperatorDelimitingOperatorKind = 'operator_delimiter';

  static token: OperatorDelimitingOperatorToken = ' ';

  static components: ConstructComponents = operatorComponents(OperatorDelimitingOperator);
}
