import { Domain, InvocationOperator } from '@constructs/ast';
import { Runtime } from '@constructs/runtime/runtime';
import { Construct } from '../../../../_abstract/construct';
import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '@constructs/runtime/_util/selectors';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Domain:SmokeTest', () => {
  it('does what we expect it to', async (done) => {
    {
      const runtime: Runtime = await initRuntime(`{one => two => three}`);
      const all: Construct[] = selectAllNodes(runtime);
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
      const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
      const all: Construct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(Domain.kind);
      expect(all.length).toEqual(10);
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
      const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
      const all: Construct[] = selectAllNodes(runtime);
      expect(last?.key).toEqual(
        '{_todo &=>checkout; "origin/main"; &=>run yarn install; &=>run yarn build=>check; "./dist" for the output of <the build step>}',
      );
      expect(last?.kind).toEqual(Domain.kind);
      expect(all.length).toEqual(52);
    }

    {
      const runtime: Runtime = await initRuntime(
        `{_<boon > ~one => two => three}`,
      );
      const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
      const all: Construct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(Domain.kind);

      expect(InvocationOperator).not.toEqual(
        'this is here so the docblock below works',
      );
      /**  note: this is subject to change dependent on the behavior of {@see InvocationOperator} */
      expect(last?.key).toEqual('{_<boon> ~; one=>two=>three}');
      expect(all.length).toEqual(19);
    }

    done();
  });
});
