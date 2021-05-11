import {SpwNode} from '../../../_abstract/node';
import {SpwItemKind} from '../../../../_types/kind';
import {Component, SpwItemJunction, SpwShape} from '@constructs/ast/_abstract/types';

/**
 * Operators have "side effects" in that they represent the invocation of
 * some semantic order that extends beyond the Operation's constituent parts
 */
export default abstract class SpwOperator<Kind extends SpwItemKind = SpwShape,
    TokenSequence extends string = SpwShape,
    Junction extends SpwItemJunction = SpwItemJunction> extends SpwNode<Kind, Junction> {

    protected static token: string | undefined = undefined;

    get token(): Component<TokenSequence, string> {
        const constructor = <typeof SpwOperator>this.constructor;
        const select      = (subject: SpwShape) => { return subject.token ?? constructor.token; };
        return {
            select:   select,
            generate: function* (mut, item, ctxt) {
                yield mut(item, ctxt) ?? constructor.token;
                yield ctxt;
            },
        }
    }

    get label(): Component<TokenSequence, string> {
        const select = (subject: SpwShape) => {
            return subject.label;
        };
        return {
            select:    select,
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

    serialize(): Component[] {
        return [
            this.token,
            this.label,
        ]
    }
}