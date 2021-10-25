import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { NumberNodeKind } from '@constructs/ast/nodes/scalars/number/__types';
import { IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<NumberNodeKind>;

@staticImplements<StaticType>()
export class NumberNode extends Node<NumberNodeKind> {
  static readonly kind: NumberNodeKind = 'number';

  static components = {
    value: new ConstructComponent({
      name: 'value',
      subjectEvaluators: {
        toHydrated: (s) => parseInt(s as any),
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.value;
    },
  };

  static isNumberNode(o: unknown): o is NumberNode {
    return (o as NumberNode)?.kind === this.kind;
  }
}
