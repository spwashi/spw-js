import { PhraseNode } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { Construct } from '../../../../_abstract/construct';

describe('Phrase Nodes', () => {
  it('can be parsed', (done) => {
    (async () => {
      const runtime = await initRuntimeWithSrc(`test test test`);
      const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
      const all: Construct[] = selectAllNodesFromRuntime(runtime);
      expect(last?.kind).toEqual(PhraseNode.kind);
      expect(all.length).toEqual(4);
      expect(last?.key).toEqual('test test test');

      done();
    })();
  });
});
