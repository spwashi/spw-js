import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '../../../_util/runtime/selectors';
import { StrandExpression } from '@constructs/ast/expressions/relational/strand/expression';
import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import * as util from 'util';
import { initRuntime } from '@constructs/ast/_util/runtime/initializers/runtime';

describe('Strand Expressions', () => {
  it('is a [node] followed by any number of valid strand tails', (done) => {
    (async () => {
      let all: SpwConstruct[] = [];
      let last: SpwConstruct | undefined = undefined;
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
