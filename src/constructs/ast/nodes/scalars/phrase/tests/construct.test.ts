import { PhraseNode } from '@constructs/ast';
import { RawConstruct } from '@constructs/ast/_abstract/_types/internal';

describe('Phrase Nodes', () => {
  it('should be instantiable', async function () {
    const raw = {
      kind: 'phrase',
      src: 'boon',
      items: [
        { kind: 'string', key: '"boon"', src: '"boon"' },
        { kind: 'identifier', key: 'boon', src: 'boon' },
        { kind: 'identifier', key: 'boon', src: 'boon' },
      ],
    } as RawConstruct;
    const cut = new PhraseNode(raw);
    expect(cut.key).toEqual('"boon" boon boon');
  });
});
