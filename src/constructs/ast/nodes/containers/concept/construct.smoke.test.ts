import { Domain, InvocationOperator } from '@constructs/ast';
import { Runtime } from '@constructs/runtime/runtime';
import { SpwConstruct } from '@constructs/ast/_abstract/spwConstruct';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '@constructs/ast/_util/runtime/selectors';
import { initRuntime } from '@constructs/ast/_util/runtime/initializers/runtime';

describe('Domain:SmokeTest', () => {
  it('does what we expect it to', async (done) => {
    {
      const runtime: Runtime = await initRuntime(`{one => two => three}`);
      const all: SpwConstruct[] = selectAllNodes(runtime);
      expect(all.length).toEqual(11);
    }

    {
      const runtime: Runtime = await initRuntime(`
                            {
                                one 
                                two 
                                three
                            }
                        `);
      const last: SpwConstruct | undefined =
        selectLastAcknowledgedNode(runtime);
      const all: SpwConstruct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(Domain.kind);
      expect(all.length).toEqual(6);
    }

    {
      const runtime: Runtime = await initRuntime(`
                                {_todo
                                     &  => checkout "origin/main"
                                     &  => run yarn install
                                     &  => run yarn build
                                        => check "./dist" for the output of < the build step >
                                }
                            `);
      const last: SpwConstruct | undefined =
        selectLastAcknowledgedNode(runtime);
      const all: SpwConstruct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(Domain.kind);
      expect(all.length).toEqual(43);
    }

    {
      const runtime: Runtime = await initRuntime(
        `{_<boon > ~one => two => three}`,
      );
      const last: SpwConstruct | undefined =
        selectLastAcknowledgedNode(runtime);
      const all: SpwConstruct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(Domain.kind);

      expect(InvocationOperator).not.toEqual(
        'this is here so the docblock below works',
      );
      /**  note: this is subject to change dependent on the behavior of {@see InvocationOperator} */
      expect(last?.key).toEqual('{_<boon> ~; one=>two=>three}');
      expect(all.length).toEqual(16);
    }

    done();
  });
});
