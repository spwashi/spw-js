import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { BehaviorExpression } from '../construct';

describe('Behavior Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(location){domain}[essence]`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!BehaviorExpression.isBehaviorExpression(last)) {
      console.log(last);
      throw new Error('Expected a ' + BehaviorExpression.kind);
    }

    expect(last.kind).toEqual(BehaviorExpression.kind);
    expect(last.key).toEqual(`(location){domain}[essence]`);
    expect(all.length).toEqual(16);

    done();
  });
});
