import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { StringNode } from '@constructs/ast';
import { Construct } from '../../../../_abstract/construct';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';

describe('String Nodes', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`"this is a string"`);
    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    if (!StringNode.isStringNode(last)) {
      throw new Error('Incorrect type');
    }
    expect(last.kind).toEqual(StringNode.kind);
    expect(last.kind).toEqual(StringNode.kind);
    expect(last.key).toEqual('"this is a string"');
    expect(all.length).toEqual(1);

    done();
  });
});
