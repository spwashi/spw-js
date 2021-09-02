import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { Location } from '../construct';
import { location } from '@grammar/ast/nodes/containers/location/ref';

describe('Rule Reference', () => {
  it('should exist', function () {
    expect(location.ruleName).toEqual(Location.name);
  });
});

describe('Location', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(location)`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!Location.isLocation(last)) {
      throw new Error('Expected a ' + Location.name + ' expression');
    }

    expect(last.kind).toEqual(Location.kind);
    expect(last.key).toEqual('(location)');
    expect(all.length).toEqual(4);

    done();
  });
});
