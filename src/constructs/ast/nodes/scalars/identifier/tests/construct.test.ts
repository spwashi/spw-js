import { IdentifierNode } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import faker from 'faker';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';

describe('IdentifierNodes', () => {
  it('Can be parsed', async () => {
    const key = `${faker.random.alpha({ count: 10 })}`;
    const runtime = await initRuntimeWithSrc(key);
    const all = selectAllNodesFromRuntime(runtime);
    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    expect(IdentifierNode.isIdentifierNode(last)).toBeTruthy();
    expect(all.length).toEqual(1);
    expect(last?.key).toEqual(key);
  });
});
