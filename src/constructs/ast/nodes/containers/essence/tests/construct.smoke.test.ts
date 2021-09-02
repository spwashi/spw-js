import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { Essence } from '../construct';
import { essence } from '@grammar/ast/nodes/containers/essence/ref';

describe('Rule Reference', () => {
  it('should exist', function () {
    expect(essence.ruleName).toEqual(Essence.name);
  });
});

describe('Essence', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`[essence]`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!Essence.isEssence(last)) {
      throw new Error('Expected a ' + Essence.name + ' expression');
    }

    expect(last.kind).toEqual(Essence.kind);
    expect(last.key).toEqual('[essence]');
    expect(all.length).toEqual(4);

    done();
  });
});
