import {SpwNode} from '../../../../abstract/node';
import {SpwItemKind} from '../../../../../types/kind';
import {SpwItem} from '../../../../../abstract/item';
import {Component, SpwItemJunction, SpwShape} from '@constructs/ast/abstract/types';

/**
 *
 */
export default abstract class SpwOperator<Kind extends SpwItemKind,
    TokenSequence extends string,
    Junction extends SpwItemJunction = SpwItemJunction> extends SpwNode<Kind, Junction> {

    protected static token: string | undefined = undefined;

    get token(): Component<TokenSequence, string> {
        const constructor = <typeof SpwOperator>this.constructor;
        const select      = (subject: SpwShape) => { return subject.token ?? constructor.token; };
        return {
            select:   select,
            toString: () => {return select((this.hydrated ?? this.raw) as SpwItem) },
            generate: function* (mut, item, ctxt) {
                yield mut(item, ctxt) ?? constructor.token;
                yield ctxt;
            },
        }
    }

    get label(): Component<TokenSequence, string> {
        const select = (subject: SpwShape) => { return subject.label; };
        return {
            select:    select,
            toString:  () => {return select((this.hydrated ?? this.raw) as SpwItem)?.key },
            generate:  function* (mut, item, ctxt) {
                yield mut(item, ctxt);
                yield ctxt;
            },
            normalize: {
                string: function ([...l]) {
                    const label = l.join('');
                    return label.length ? `_${label}` : label;
                },
            },
        }
    }

    getComponents(): Component[] {
        return [this.token, this.label]
    }
}