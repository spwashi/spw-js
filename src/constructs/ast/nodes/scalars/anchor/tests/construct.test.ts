import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '../../../../../runtime/_util/selectors';
import { AnchorNode } from '@constructs/ast';
import faker from 'faker';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';

describe('AnchorNodes', () => {
  it('Can be parsed', async () => {
    const key = `${faker.random.alpha({ count: 10 })}`;
    const runtime = await initRuntimeWithSrc(key);
    const all = selectAllNodesFromRuntime(runtime);
    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    expect(AnchorNode.isAnchorNode(last)).toBeTruthy();
    expect(all.length).toEqual(1);
    expect(last?.key).toEqual(key);
  });
});
