import { NumberNode } from '@constructs/ast/nodes/scalars/number/construct';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';

describe(NumberNode.name, () => {
  it('Can be parsed', async (done) => {
    try {
      const runtime = await initRuntimeWithSrc(`890`);
      const all = selectAllNodesFromRuntime(runtime);
      const last = selectLastAcknowledgedNodeFromRuntime(runtime);
      expect(all.length).toEqual(1);
      expect(last?.key).toEqual('890');
      done();
    } catch (e) {
      console.log(e);
    }
  });
});
