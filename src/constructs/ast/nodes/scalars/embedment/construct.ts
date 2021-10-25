import {
  IConstructComponent,
  ComponentSubjectEvaluatorObject,
} from '../../../_abstract/_types/IConstructComponent';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { EmbedmentNodeKind } from '@constructs/ast/nodes/scalars/embedment/__types';
import { IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<EmbedmentNodeKind>;

@staticImplements<StaticType>()
export class EmbedmentNode extends Node<EmbedmentNodeKind> {
  static readonly kind: EmbedmentNodeKind = 'embedment';

  static components = {
    open: new ConstructComponent({
      name: 'open',

      valueSelector: () => '`',
    }),

    body: new ConstructComponent({
      name: 'body',

      subjectEvaluators: {
        stringify: (s: string[] | undefined) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(''),
      } as ComponentSubjectEvaluatorObject,
    }),

    close: new ConstructComponent({
      name: 'close',

      valueSelector: () => '`',
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.open;
      yield this.body;
      yield this.close;
    },
  };

  static isEmbedmentNode(o: unknown): o is EmbedmentNode {
    return (o as EmbedmentNode)?.kind === this.kind;
  }
}
