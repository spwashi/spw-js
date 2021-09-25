import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  BlockDelimiterKind,
  BlockDelimiterToken,
} from '@constructs/ast/nodes/operators/semantic/block/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<BlockDelimiterKind>>()
export class BlockDelimiter extends Delimiter<BlockDelimiterKind> {
  static kind: BlockDelimiterKind = 'block_delimiter';

  static token: BlockDelimiterToken = ';';

  static components: ConstructComponents = operatorComponents(BlockDelimiter);
}
