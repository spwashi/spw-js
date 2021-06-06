import { LanguageComponent } from '@constructs/ast/_abstract/component/index';

describe('Language Components', () => {
  it('can be instantiated', () => {
    const cName = 'something';
    const construct = new LanguageComponent({ name: cName });
    expect(construct.name).toEqual(cName);
  });
});
