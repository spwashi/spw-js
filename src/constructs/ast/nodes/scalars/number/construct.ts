import { Node } from '../../_abstract/node';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { ComponentDescription } from '@constructs/ast/_abstract/_types';
import { NumberNodeKind } from '@constructs/ast/nodes/scalars/number/__types';

type StaticType = IConstructClass<NumberNodeKind>;

@staticImplements<StaticType>()
export class NumberNode extends Node<NumberNodeKind> {
  static readonly kind: NumberNodeKind = 'number';

  static components = {
    value: Construct.makeComponent({
      name: 'value',
      evaluators: {
        hydrate: (s) => parseInt(s as any),
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.value;
    },
  };

  static isNumberNode(o: unknown): o is NumberNode {
    return (o as NumberNode)?.kind === this.kind;
  }
}
