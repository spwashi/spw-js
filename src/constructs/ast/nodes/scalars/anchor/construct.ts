import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';
import { ComponentDescription } from '../../../_abstract/_types';
import { AnchorNodeKind } from '@constructs/ast/nodes/scalars/anchor/__types';

type StaticType = IConstructClass<AnchorNodeKind>;

@staticImplements<StaticType>()
export class AnchorNode extends Node<AnchorNodeKind> {
  static readonly kind: AnchorNodeKind = 'anchor';

  static components = {
    label: Construct.makeComponent({
      name: 'label',
      selector: (s) => s.label,
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.label;
    },
  };

  static isAnchorNode(o: unknown): o is AnchorNode {
    return (o as AnchorNode)?.kind === this.kind;
  }
}
