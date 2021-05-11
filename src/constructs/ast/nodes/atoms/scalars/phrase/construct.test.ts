import {PhraseNode} from '@constructs/ast';

describe('Phrase Nodes', () => {
    it('should be instantiable', function () {
        const cut = new PhraseNode({
                                       kind: 'phrase',
                                       src:  'boon',
                                       body: [
                                           {kind: 'string', key: '"boon"', src: '"boon"'},
                                           {kind: 'anchor', key: 'boon', src: 'boon'},
                                           {kind: 'anchor', key: 'boon', src: 'boon'},
                                       ],
                                   });
        expect(cut.key).toEqual('"boon" boon boon')
    });
})