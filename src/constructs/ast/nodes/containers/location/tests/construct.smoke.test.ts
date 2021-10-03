import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Location } from '../construct';

describe('Location', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(location)`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Location.isLocation(last)) {
      throw new Error('Expected a ' + Location.name + ' expression');
    }

    expect(last.kind).toEqual(Location.kind);
    expect(last.key).toEqual('(location)');
    expect(all.length).toEqual(5);

    done();
  });
});
