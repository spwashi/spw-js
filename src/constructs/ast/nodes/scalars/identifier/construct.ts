import { IConstructComponent } from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { IdentifierNodeKind } from '@constructs/ast/nodes/scalars/identifier/__types';
import { IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<IdentifierNodeKind>;

@staticImplements<StaticType>()
export class IdentifierNode extends Node<IdentifierNodeKind> {
  static readonly kind: IdentifierNodeKind = 'identifier';

  static components = {
    label: new ConstructMetaComponent({
      name: 'label',
      valueSelector: (s) => {
        return s.label;
      },
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.label;
    },
  };

  static isIdentifierNode(o: unknown): o is IdentifierNode {
    return (o as IdentifierNode)?.kind === this.kind;
  }
}
