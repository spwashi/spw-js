import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Domain } from '../construct';

describe('Domain', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`{_label domain }`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Domain.isDomain(last)) {
      throw new Error('Expected a ' + Domain.name + ' expression');
    }

    expect(last.kind).toEqual(Domain.kind);
    expect(last.key).toEqual('{_label domain}');
    expect(all.length).toEqual(7);

    done();
  });
});
