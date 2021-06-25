import { Runtime } from '@constructs/runtime/runtime';
import { Construct } from '../../../../_abstract/construct';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '@constructs/runtime/_util/selectors';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Domain', () => {
  it('can have a Labeled Objective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{_boon test }`);
    const all: Construct[] = selectAllNodes(runtime);
    const last = selectLastAcknowledgedNode(runtime);
    if (!last) throw new Error('Expected a node');
    expect(last.key).toEqual('{_boon test}');
    expect(all.length).toEqual(6);
    done();
  });

  it('can have a Labeled Subjective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{ test }_boon`);
    const all: Construct[] = selectAllNodes(runtime);
    expect(selectLastAcknowledgedNode(runtime)?.key).toEqual('{test}_boon');
    expect(all.length).toEqual(5);
    done();
  });

  it('can have a Labeled Objective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{_boon ~ test }`);
    const all: Construct[] = selectAllNodes(runtime);
    expect(selectLastAcknowledgedNode(runtime)?.key).toEqual('{_boon ~; test}');
    expect(all.length).toEqual(9);
    done();
  });
});
