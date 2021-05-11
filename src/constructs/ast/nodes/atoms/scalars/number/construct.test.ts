import {NumberNode} from '@constructs/ast/nodes/atoms/scalars/number/construct';

describe('Number', () => {
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', src: '4'}, {kind: 'number', value: '4'})
        expect(n.key).toEqual(4);
    });
    it('should be instantiable', function () {
        const n = new NumberNode({kind: 'number', src: '4'}, {kind: 'number', value: '4'})
        expect(n.key).toEqual(4);
    });
})