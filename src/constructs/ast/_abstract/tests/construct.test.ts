import { IConstructComponent } from '../_types/IConstructComponent';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';
import * as faker from 'faker';
import { Construct, ConstructComponents } from '../construct';

describe('Constructs', () => {
  it('Can be initialized', () => {
    const testvar_1 = faker.datatype.string();
    const node_1 = new Construct(testvar_1);
    expect(node_1).toBeInstanceOf(Construct);
    expect(node_1.internal).toEqual(testvar_1);

    const testvar_2 = faker.datatype.number();
    const node_2 = new Construct(testvar_2);
    expect(node_2.internal).toEqual(testvar_2);
  });
  it('Can have components', function () {
    const randName_1 = faker.datatype.string();
    const randName_2 = faker.datatype.string();
    const randName_3 = faker.datatype.string();

    const Example = class extends Construct {
      static components: ConstructComponents = {
        *[Symbol.iterator](): Iterator<IConstructComponent> {
          yield new ConstructMetaComponent({
            name: randName_1,
          });
          yield new ConstructMetaComponent({
            name:          randName_2,
            valueSelector: () => '!!!',
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
