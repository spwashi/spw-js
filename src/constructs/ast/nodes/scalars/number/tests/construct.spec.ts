import { selectAllNodes, selectLastAcknowledgedNode } from '../../../../../runtime/_util/selectors';
import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe(NumberNode.name, () => {
  it('Can be parsed', async (done) => {
    try {
      const runtime = await initRuntime(`890`);
      const all = selectAllNodes(runtime);
      const last = selectLastAcknowledgedNode(runtime);
      expect(all.length).toEqual(1);
      expect(last?.key).toEqual('890');
      done();
    } catch (e) {
      console.log(e);
    }
  });
});
