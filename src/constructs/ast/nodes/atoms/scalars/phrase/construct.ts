import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic, SpwItem} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {ComponentPrototype} from '@constructs/ast/_abstract/types';

type Kind = 'phrase';

@staticImplements<ISpwItemStatic<'phrase'>>()
export class PhraseNode extends SpwNode<Kind> {
    static readonly kind = 'phrase';

    static isPhraseNode(o: unknown): o is PhraseNode {
        return (o as PhraseNode)?.kind === this.kind;
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            {
                ...SpwItem._genericComponent(),
                componentName: 'body',
                selector:      s => s.body,
                evaluator:     {stringify: s => Array.from(s ?? []).join(' ')},
            },
        ];
    }
}