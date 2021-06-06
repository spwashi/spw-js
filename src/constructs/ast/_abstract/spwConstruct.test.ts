import { ConstructComponents, SpwConstruct } from './spwConstruct';
import { ComponentDescription } from './_types';
import * as faker from 'faker';

describe('SpwConstruct', () => {
  it('Can be initialized', () => {
    const testvar_1 = faker.datatype.string();
    const node_1 = new SpwConstruct(testvar_1);
    expect(node_1).toBeInstanceOf(SpwConstruct);
    expect(node_1.internal).toEqual(testvar_1);

    const testvar_2 = faker.datatype.number();
    const node_2 = new SpwConstruct(testvar_2);
    expect(node_2.internal).toEqual(testvar_2);
  });
  it('should have components', function () {
    const randName_1 = faker.datatype.string();
    const randName_2 = faker.datatype.string();
    const randName_3 = faker.datatype.string();

    const Example = class extends SpwConstruct {
      static components: ConstructComponents = {
        *[Symbol.iterator](): Iterator<ComponentDescription> {
          yield SpwConstruct.makeComponent({
            name: randName_1,
          });
          yield SpwConstruct.makeComponent({
            name: randName_2,
            selector: () => '!!!',
          });
        },
      };
    };

    const example = new Example({
      [randName_1]: randName_3,
    });
    expect(example.key).toEqual(randName_3 + '!!!');
  });
});
