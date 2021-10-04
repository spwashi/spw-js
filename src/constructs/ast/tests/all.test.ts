import { Construct } from '@constructs/ast/_abstract/construct';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';
import * as util from 'util';

describe('Something', () => {
  it('works', async () => {
    const items = [
      `( {} => {
        s => {
            s => {
            
            }
        }
      }  )`,
      `
        ( #_more s; interesting ){
          test => (#_test);
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
              #_replacement => "InvoiceItems"
            ]
          };
       `,
    ];
    items
      .map((item) => {
        const node = getSalientNode(item);
        if (!node) return false;
        const inspect = util.inspect(
          {
            key: node.key,
          },
          false,
          null,
          true,
        );
        const doinspect = false;
        console.log(node.key);
        doinspect && console.log(inspect);
        return getAllNodes(item);
      })
      .filter(Boolean) as Construct[][];
  });
});
