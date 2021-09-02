import { Node } from '../../_abstract/node';
import { Construct, IConstructClass } from '../../../_abstract/construct';
import { staticImplements } from '../../../_util/typescript/staticImplements';
import { ComponentDescription, ComponentEvaluatorObject } from '@constructs/ast/_abstract/_types';
import { PhraseNodeKind } from '@constructs/ast/nodes/scalars/phrase/__types';

type StaticType = IConstructClass<PhraseNodeKind>;

@staticImplements<StaticType>()
export class PhraseNode extends Node<PhraseNodeKind> {
  static readonly kind: PhraseNodeKind = 'phrase';

  static components = {
    body: Construct.makeComponent({
      name: 'body',

      evaluators: {
        stringify: (s) =>
          Array.from(s ?? [])
            .filter(Boolean)
            .join(' '),
      } as ComponentEvaluatorObject,
    }),

    *[Symbol.iterator](): Generator<ComponentDescription> {
      yield this.body;
    },
  };

  static isPhraseNode(o: unknown): o is PhraseNode {
    return (o as PhraseNode)?.kind === this.kind;
  }
}
