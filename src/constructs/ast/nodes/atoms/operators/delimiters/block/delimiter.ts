import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import {
  ISpwConstructStatic,
  ConstructComponents,
} from '../../../../../_abstract/construct';
import { SpwDelimiter } from '@constructs/ast/nodes/atoms/operators/delimiters/_abstract/delimiter';
import { operatorComponents } from '@constructs/ast/nodes/atoms/operators/_abstract/operator';

type BlockDelimiterToken = ';';

@staticImplements<ISpwConstructStatic<'block_delimiter'>>()
export class BlockDelimiter extends SpwDelimiter<'block_delimiter'> {
  static kind: 'block_delimiter' = 'block_delimiter';

  static token: BlockDelimiterToken = ';';

  static components: ConstructComponents = operatorComponents(BlockDelimiter);
}
