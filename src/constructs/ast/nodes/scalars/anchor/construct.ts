import { ComponentDescription } from '@constructs/ast/_abstract/_types/componentDescription';
import { AnchorNodeKind } from '@constructs/ast/nodes/scalars/anchor/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<AnchorNodeKind>;

@staticImplements<StaticType>()
export class AnchorNode extends Node<AnchorNodeKind> {
  static readonly kind: AnchorNodeKind = 'anchor';

  static components = {
    label: Construct.makeComponent({
      name: 'label',
      selector: (s) => {
        return s.label;
      },
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.label;
    },
  };

  static isAnchorNode(o: unknown): o is AnchorNode {
    return (o as AnchorNode)?.kind === this.kind;
  }
}
