import { getSalientNode } from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';

describe('Something', () => {
  it('works', async () => {
    const all = getSalientNode(`
    _something {
        (11, 12) => [
            #_purpose     => do something interesting;
            #_replacement => 
              "InvoiceItems";
        ]
    };
`);
    console.log(all?.key);
  });
});
