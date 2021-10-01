import { Construct } from '@constructs/ast/_abstract/construct';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';
import * as util from 'util';

describe('Something', () => {
  it('works', async () => {
    [
      `
        ( #_more; interesting ){
          test => #_test;
          #_test => test;
          test test;
        }[];
      `,
      ` { <>test(){}[]; } `,
      ` { <>test{}[]; } `,
      ` { <>test []; } `,
      `
          _something {
            (11..12) => [
              #_purpose     => do something interesting;
              #_replacement => "InvoiceItems";
            ]
          };
       `,
    ]
      .map((item) => {
        const node = getSalientNode(item);
        if (!node) return false;
        console.log(
          util.inspect(
            {
              key: node.key,
              internal: node.internal,
            },
            false,
            null,
            true,
          ),
        );
        return getAllNodes(item);
      })
      .filter(Boolean) as Construct[][];
  });
});
