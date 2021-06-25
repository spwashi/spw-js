import { Register } from '@constructs/runtime/register/register';
import * as faker from 'faker';

describe('Registers', () => {
  it('Can be initialized', () => {
    const register = new Register();
    expect(register).toBeInstanceOf(Register);
  });

  it('Can list all items registered', () => {
    const MAX_ITEMS = 100;

    // input

    const inputItems = Array(faker.datatype.number(MAX_ITEMS)).map(() =>
      faker.datatype.string(),
    );

    // output

    const outputRegister = new Register(inputItems);

    const outputFlat = outputRegister.flat;

    expect(outputFlat.length).toEqual(inputItems.length);

    // the items should be in reverse order

    const reversedSeed = [...inputItems].reverse();
    outputFlat.map((item, i) => expect(item).toEqual(reversedSeed[i]));
  });

  it('Responds to a "memory" setting by limiting output to that number of entries', () => {
    const MAX_ITEMS = 100;

    // input

    const inputItems = Array(faker.datatype.number(MAX_ITEMS)).map(() =>
      faker.datatype.string(),
    );
    const inputMemory = faker.datatype.number(
      inputItems.length / faker.datatype.number(MAX_ITEMS),
    );

    // output

    const outputRegister = new Register(inputItems, { memory: inputMemory });
    const outputFlat = outputRegister.flat;

    expect(outputFlat.length).toEqual(inputMemory);

    // the items should be in reverse order

    const reversedSeed = [...inputItems].reverse();
    outputFlat.map((item, i) => expect(item).toEqual(reversedSeed[i]));
  });
});
