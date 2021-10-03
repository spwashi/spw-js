import { ConstructComponent } from '@constructs/ast/_abstract/component/component';

describe('Language Components', () => {
  it('can be instantiated', () => {
    const cName = 'something';
    const construct = new ConstructComponent({ name: cName });
    expect(construct.name).toEqual(cName);
  });
});
