import { StringNode } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Construct } from "@constructs/ast/_abstract/construct";

describe('String Nodes', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(` "this is a string $ - > [] _ . {}!@#$%^&*()_+1234567890-=''" `);
    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    if (!StringNode.isStringNode(last)) {
      throw new Error('Incorrect type');
    }
    expect(last.kind).toEqual(StringNode.kind);
    expect(last.kind).toEqual(StringNode.kind);
    expect(last.key).toEqual(`"this is a string $ - > [] _ . {}!@#$%^&*()_+1234567890-=''"`);
    expect(all.length).toEqual(1);

    done();
  });
});
