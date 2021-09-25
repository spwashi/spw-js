import { staticImplements } from '@constructs/ast/_util/typescript/staticImplements';
import { operatorComponents } from '@constructs/ast/nodes/operators/_abstract/operator';
import { Delimiter } from '@constructs/ast/nodes/operators/semantic/_abstract/delimiter';
import {
  NodeDelimiterToken,
  NodeDelimterKind,
} from '@constructs/ast/nodes/operators/semantic/node/__types';
import { ConstructComponents, IConstructClass } from '../../../../_abstract/construct';

@staticImplements<IConstructClass<NodeDelimterKind>>()
export class NodeDelimiter extends Delimiter<NodeDelimterKind> {
  static kind: NodeDelimterKind = 'node_delimiter';

  static token: NodeDelimiterToken = ' ';

  static components: ConstructComponents = operatorComponents(NodeDelimiter);
}
