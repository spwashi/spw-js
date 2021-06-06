import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '../../../../runtime/_util/selectors';
import { StrandExpression } from '@constructs/ast/expressions/relational/strand/expression';
import { Construct } from '../../../_abstract/construct';
import * as util from 'util';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Strand Expressions', () => {
  it('is a [node] followed by any number of valid strand tails', (done) => {
    (async () => {
      let all: Construct[] = [];
      let last: Construct | undefined = undefined;
      try {
        const runtime = await initRuntime(
          `test test test =>    test    =>    test   `,
        );
        last = selectLastAcknowledgedNode(runtime);
        all = selectAllNodes(runtime);
        expect(last?.kind).toEqual(StrandExpression.kind);
        expect(all.length).toEqual(11);
        expect(last?.key).toEqual('test test test=>test=>test');
        done();
      } catch (e) {
        console.log(util.inspect(e, { depth: null, colors: true }));
        throw new Error('Parsing Error');
      }
    })();
  });
});
