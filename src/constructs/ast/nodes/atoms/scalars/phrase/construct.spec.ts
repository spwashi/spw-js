import {
  selectAllNodes,
  selectLastAcknowledgedNode,
} from '../../../../../runtime/_util/selectors';
import { PhraseNode } from '@constructs/ast';
import { Construct } from '../../../../_abstract/construct';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('Phrase Nodes', () => {
  it('can be parsed', (done) => {
    (async () => {
      const runtime = await initRuntime(`test test test`);
      const last: Construct | undefined = selectLastAcknowledgedNode(runtime);
      const all: Construct[] = selectAllNodes(runtime);
      expect(last?.kind).toEqual(PhraseNode.kind);
      expect(all.length).toEqual(4);
      expect(last?.key).toEqual('test test test');

      done();
    })();
  });
});
