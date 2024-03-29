import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Concept } from '../construct';

describe('Concept', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`<concept>`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Concept.isConcept(last)) {
      throw new Error('Expected a ' + Concept.name + ' expression');
    }

    expect(last.kind).toEqual(Concept.kind);
    expect(last.key).toEqual('<concept>');
    expect(all.length).toEqual(5);

    done();
  });
});
