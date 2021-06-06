import { Runtime } from '@constructs/runtime/runtime';
import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '@constructs/ast/_util/runtime/selectors';
import { initRuntime } from '@constructs/ast/_util/runtime/initializers/runtime';

describe('Domain', () => {
  it('can have a Labeled Objective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{_boon test }`);
    const all: SpwConstruct[] = selectAllNodes(runtime);
    expect(selectLastAcknowledgedNode(runtime)?.key).toEqual('{_boon test}');
    expect(all.length).toEqual(5);
    done();
  });

  it('can have a Labeled Subjective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{ test }_boon`);
    const all: SpwConstruct[] = selectAllNodes(runtime);
    expect(selectLastAcknowledgedNode(runtime)?.key).toEqual('{test}_boon');
    expect(all.length).toEqual(5);
    done();
  });

  it('can have a Labeled Objective Delimiter', async (done) => {
    const runtime: Runtime = await initRuntime(`{_boon ~ test }`);
    const all: SpwConstruct[] = selectAllNodes(runtime);
    expect(selectLastAcknowledgedNode(runtime)?.key).toEqual('{_boon ~; test}');
    expect(all.length).toEqual(6);
    done();
  });
});
