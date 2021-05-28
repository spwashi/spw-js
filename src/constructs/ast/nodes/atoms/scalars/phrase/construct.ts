import {SpwNode} from '../../../_abstract/node';
import {ISpwConstructStatic, SpwConstruct} from '../../../../_abstract/spwConstruct';
import {staticImplements} from '../../../../_util/typescript/staticImplements';
import {ComponentDescription, ComponentEvaluatorObject} from '@constructs/ast/_abstract/_types';

type Kind = 'phrase';

@staticImplements<ISpwConstructStatic<'phrase'>>()
export class PhraseNode extends SpwNode<Kind> {
    static readonly kind = 'phrase';

    static components =
               {
                   body:
                       SpwConstruct.makeComponent({
                                                 name: 'body',

                                                 evaluators:
                                                     {
                                                         stringify: s => Array.from(s ?? []).filter(Boolean).join(' '),
                                                     } as ComponentEvaluatorObject,
                                             }),

                   * [Symbol.iterator](): Generator<ComponentDescription> {
                       yield this.body
                   },
               };

    static isPhraseNode(o: unknown): o is PhraseNode {
        return (o as PhraseNode)?.kind === this.kind;
    }
}