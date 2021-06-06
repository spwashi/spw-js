import { PhraseNode } from '@constructs/ast';
import { RawSpwConstruct } from '@constructs/ast/_abstract/_types/internal';

describe('Phrase Nodes', () => {
  it('should be instantiable', async function () {
    const raw = {
      kind: 'phrase',
      src: 'boon',
      body: [
        { kind: 'string', key: '"boon"', src: '"boon"' },
        { kind: 'anchor', key: 'boon', src: 'boon' },
        { kind: 'anchor', key: 'boon', src: 'boon' },
      ],
    } as RawSpwConstruct;
    const cut = new PhraseNode(raw);
    expect(cut.key).toEqual('"boon" boon boon');
  });
});
