import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  BlockDelimitingOperatorKind,
  BlockDelimitingOperatorToken,
} from '@constructs/ast/nodes/operators/semantic/block/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<BlockDelimitingOperatorKind>>()
export class BlockDelimitingOperator extends Delimiter<BlockDelimitingOperatorKind> {
  static kind: BlockDelimitingOperatorKind = 'block_delimiter';

  static token: BlockDelimitingOperatorToken = ';';

  static components: ConstructComponents = operatorComponents(BlockDelimitingOperator);
}
