import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';
import {hydrate} from '@constructs/ast/_util/hydrate';
import {SpwConstruct} from '@constructs/ast/_abstract/spwConstruct';

describe('Number', () => {
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', value: '4'})
        expect(n.key).toEqual('4');
    });
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', value: '4'})
        expect(n.key).toEqual('4');
    });
    it('should be hydrate-able', function () {
        const n = new NumberNode({kind: 'number', value: '4'})
        expect(n.key).toEqual('4');

        const out = NumberNode.hydrate({value: '4'},
                                       {
                                           hydrate: (raw, context) => hydrate(raw, context) as SpwConstruct | null,
                                       });
        expect(out).toBeInstanceOf(NumberNode);
    });
})