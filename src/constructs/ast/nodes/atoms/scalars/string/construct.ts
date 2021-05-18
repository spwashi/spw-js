import {SpwNode} from '../../../_abstract/node';
import {ISpwItemStatic, SpwItem} from '../../../../_abstract/item';
import {staticImplements} from '../../../../_util/staticImplements';
import {ComponentPrototype} from '@constructs/ast/_abstract/types';
import {RawSpwItem} from '@constructs/ast/_abstract/interfaces/internal';
import _ from 'lodash';


@staticImplements<ISpwItemStatic<'string'>>()
export class StringNode extends SpwNode<'string'> {
    static readonly kind = 'string';

    static isStringNode(o: unknown): o is StringNode {
        return (o as StringNode)?.kind === this.kind;
    }

    static getComponentPrototypes(): ComponentPrototype[] {
        return [
            {
                ...SpwItem._genericComponent(),
                selector:      () => '"',
                componentName: 'open',
            },
            {
                ..._.merge(
                    SpwItem._genericComponent(),
                    {selector: (s: RawSpwItem) => s.chars},
                    {evaluator: {stringify: (s: string[]) => Array.from(s ?? []).join('')}},
                ),
                componentName: 'chars',
            },
            {
                ...SpwItem._genericComponent(),
                selector:      () => '"',
                componentName: 'close',
            },
        ];
    }
}