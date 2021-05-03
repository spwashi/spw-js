import {SpwExpression} from '../abstract/expression';
import {staticImplements} from '../../util/staticImplements';
import {ISpwItemStatic, SpwItem} from '../../abstract/item';
import {SpwItemKey} from '@constructs/ast/abstract/types';

type Kind = 'perspective_expression';

@staticImplements<ISpwItemStatic<Kind>>()
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