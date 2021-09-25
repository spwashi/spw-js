import { Construct } from '@constructs/ast/_abstract/construct';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';

describe('Something', () => {
  it('works', async () => {
    const arrs = [
      `
        ( #_more; interesting ){
          #_test;
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
        console.log(node.key);
        return getAllNodes(item);
      })
      .filter(Boolean) as Construct[][];

    arrs.forEach((nodes: Construct[]) => {
      nodes.map((node) => console.log(node.key));
    });
  });
});
