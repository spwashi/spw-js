import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { ConstructComponents, IConstructClass } from '../../../../../_abstract/construct';
import { Delimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';
import {
  BlockDelimitingOperatorKind,
  BlockDelimitingOperatorToken,
} from '@constructs/ast/nodes/atoms/operators/delimiters/block/__types';

@staticImplements<IConstructClass<BlockDelimitingOperatorKind>>()
export class BlockDelimitingOperator extends Delimiter<BlockDelimitingOperatorKind> {
  static kind: BlockDelimitingOperatorKind = 'block_delimiter';

  static token: BlockDelimitingOperatorToken = ';';

  static components: ConstructComponents = operatorComponents(BlockDelimitingOperator);
}
