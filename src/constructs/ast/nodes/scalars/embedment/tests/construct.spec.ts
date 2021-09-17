import { EmbedmentNode } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { Construct } from '../../../../_abstract/construct';

describe('Embedment Nodes', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc('`this is an embedment`');
    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    if (!EmbedmentNode.isEmbedmentNode(last)) {
      console.log(last);
      throw new Error(
        'Expected a ' +
          EmbedmentNode.name +
          ', received a ' +
          (last?.kind ?? JSON.stringify(last, null, 3)),
      );
    }
    expect(last.kind).toEqual(EmbedmentNode.kind);
    expect(last.kind).toEqual(EmbedmentNode.kind);
    expect(last.key).toEqual('`this is an embedment`');
    expect(all.length).toEqual(1);

    done();
  });
});
