import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Essence } from '../construct';

describe('Essence', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`[essence]`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Essence.isEssence(last)) {
      throw new Error('Expected a ' + Essence.name + ' expression');
    }

    expect(last.kind).toEqual(Essence.kind);
    expect(last.key).toEqual('[essence]');
    expect(all.length).toEqual(5);

    done();
  });
});
