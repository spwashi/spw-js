import {
  ComponentDescription,
  ComponentEvaluatorObject,
} from '@constructs/ast/_abstract/_types/componentDescription';
import { EmbedmentNodeKind } from '@constructs/ast/nodes/scalars/embedment/__types';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<EmbedmentNodeKind>;

@staticImplements<StaticType>()
export class EmbedmentNode extends Node<EmbedmentNodeKind> {
  static readonly kind: EmbedmentNodeKind = 'embedment';

  static components = {
    open: Construct.makeComponent({
      name: 'open',

      selector: () => '`',
    }),

    body: Construct.makeComponent({
      name: 'body',

      evaluators: {
        stringify: (s: string[] | undefined) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(''),
      } as ComponentEvaluatorObject,
    }),

    close: Construct.makeComponent({
      name: 'close',

      selector: () => '`',
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.open;
      yield this.body;
      yield this.close;
    },
  };

  static isEmbedmentNode(o: unknown): o is EmbedmentNode {
    return (o as EmbedmentNode)?.kind === this.kind;
  }
}
