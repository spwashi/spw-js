import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { LocatedEssenceExpression } from '../construct';

describe('Located Essence Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(location)[essence]`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);
    if (!LocatedEssenceExpression.isLocatedEssenceExpression(last)) {
      console.log(last);
      throw new Error('Expected a ' + LocatedEssenceExpression.kind);
    }

    expect(last.kind).toEqual(LocatedEssenceExpression.kind);
    expect(last.key).toEqual(`(location)[essence]`);
    expect(all.length).toEqual(11);

    done();
  });
});
