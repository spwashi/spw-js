import {
  IConstructComponent,
  ComponentSubjectEvaluatorObject,
} from '../../../_abstract/_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import { StringNodeKind } from '@constructs/ast/nodes/scalars/string/__types';
import { IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<StringNodeKind>;

@staticImplements<StaticType>()
export class StringNode extends Node<StringNodeKind> {
  static readonly kind: StringNodeKind = 'string';

  static components = {
    open: new ConstructMetaComponent({
      name: 'open',

      valueSelector: () => '"',
    }),

    body: new ConstructMetaComponent({
      name: 'body',

      subjectEvaluators: {
        stringify: (s: string[] | undefined) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(''),
      } as ComponentSubjectEvaluatorObject,
    }),

    close: new ConstructMetaComponent({
      name: 'close',

      valueSelector: () => '"',
    }),

    *[Symbol.iterator](): Generator<IConstructComponent> {
      yield this.open;
      yield this.body;
      yield this.close;
    },
  };

  static isStringNode(o: unknown): o is StringNode {
    return (o as StringNode)?.kind === this.kind;
  }
}
