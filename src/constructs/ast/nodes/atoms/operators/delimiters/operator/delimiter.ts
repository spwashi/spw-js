import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ConstructComponents,
  ISpwConstructStatic,
} from '../../../../../_abstract/construct';
import { SpwDelimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type OperatorDelimiterToken = ' ';

@staticImplements<ISpwConstructStatic<'operator_delimiter'>>()
export class OperatorDelimiter extends SpwDelimiter<'operator_delimiter'> {
  static kind: 'operator_delimiter' = 'operator_delimiter';

  static token: OperatorDelimiterToken = ' ';

  static components: ConstructComponents =
    operatorComponents(OperatorDelimiter);
}
