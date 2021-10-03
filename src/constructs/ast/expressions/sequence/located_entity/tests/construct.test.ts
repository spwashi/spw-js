import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { LocatedEntityExpression } from '../construct';

describe('LocatedEntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(somewhere)<something>someone`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!LocatedEntityExpression.isLocatedEntityExpression(last)) {
      console.log(last);
      throw new Error('Expected a ' + LocatedEntityExpression.name + ' expression');
    }

    expect(last.kind).toEqual(LocatedEntityExpression.kind);
    expect(last.key).toEqual('(somewhere)<something>someone');
    expect(all.length).toEqual(13);

    done();
  });
});
