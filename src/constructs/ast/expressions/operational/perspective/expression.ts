import {SpwExpression} from '../../_abstract/expression';
import {staticImplements} from '../../../_util/staticImplements';
import {ISpwItemStatic, SpwItem} from '../../../_abstract/item';
import {SpwItemKey} from '@constructs/ast/_abstract/types';

type Kind = 'perspective_expression';

@staticImplements<ISpwItemStatic<'perspective_expression'>>()
export class PerspectiveExpression extends SpwExpression<Kind> {
    static readonly kind = 'perspective_expression';
    get key(): SpwItemKey {
        return [
            [
                (this.hydrated?.source as SpwItem)?.key || '&',
                (this.hydrated?.lens as { atom: SpwItem })?.atom?.key || '@',
                (this.hydrated?.lens as { spec: SpwItem })?.spec?.key || null,
            ]
                .filter(Boolean).join(''),
            (this.hydrated?.target as SpwItem)?.key || '&',
        ].filter(Boolean).join(' ');
    }

    static isPerspectiveExpression(o: unknown): o is PerspectiveExpression {
        return (o as PerspectiveExpression)?.kind === this.kind;
    }
}