import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { LocatedConceptExpression } from '../construct';

describe('LocatedConceptExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(somewhere)<something>`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!LocatedConceptExpression.isLocatedConceptExpression(last)) {
      throw new Error('Expected a Node expression');
    }

    expect(last.kind).toEqual(LocatedConceptExpression.kind);
    expect(last.key).toEqual('(somewhere)<something>');
    expect(all.length).toEqual(11);

    done();
  });
});
