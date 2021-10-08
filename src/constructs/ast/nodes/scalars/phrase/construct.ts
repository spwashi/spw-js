import {
  ComponentDescription,
  ComponentSubjectEvaluatorObject,
} from '@constructs/ast/_abstract/_types/componentDescription';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';
import { PhraseNodeKind } from '@constructs/ast/nodes/scalars/phrase/__types';
import { IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { Node } from '../../_abstract/node';

type StaticType = IConstructClass<PhraseNodeKind>;

@staticImplements<StaticType>()
export class PhraseNode extends Node<PhraseNodeKind> {
  static readonly kind: PhraseNodeKind = 'phrase';

  static components = {
    items: new ConstructComponent({
      name: 'items',

      subjectEvaluators: {
        stringify: (s) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(' '),
      } as ComponentSubjectEvaluatorObject,
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.items;
    },
  };

  static isPhraseNode(o: unknown): o is PhraseNode {
    return (o as PhraseNode)?.kind === this.kind;
  }
}
