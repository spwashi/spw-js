import { Runtime } from '@constructs/runtime/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '../../../../../runtime/_util/selectors';
import { AnchorNode } from '@constructs/ast';
import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';

describe('AnchorNodes', () => {
  it('Can start with an character of the alphabet and consist of alphanumeric characters, underscores, and dashes', async () => {
    try {
      const runtime = await initRuntime(`step`);
      const all = selectAllNodes(runtime);
      const last = selectLastAcknowledgedNode(runtime);
      expect(AnchorNode.isAnchorNode(last)).toBeTruthy();
      expect(all.length).toEqual(1);
    } catch (e) {
      throw new Error('Parsing Error');
    }
  });

  it('Must start with an alphabetic character and must end with an alphanumeric character', async () => {
    const asyncTest = async (src: string, check: (runtime: Runtime, src: string) => void) => {
      try {
        const runtime = await initRuntime(src);
        check(runtime, src);
      } catch (e) {
        throw new Error('Parsing Error');
      }
    };
    const len = (l: number) => (runtime: Runtime, src: string) => {
      const all = selectAllNodes(runtime);
      const last = selectLastAcknowledgedNode(runtime);
      expect(last?.kind).toEqual('anchor');
      expect(last?.key).toEqual(src);
      expect(all.length).toEqual(l);
    };
    try {
      await expect(asyncTest(`test`, len(1))).resolves;
      await expect(asyncTest(`test222`, len(1))).resolves;
      await expect(asyncTest(`test-222`, len(1))).resolves;
      await expect(asyncTest(`test`, len(1))).resolves;
      await expect(asyncTest(`2test`, len(0)))
        .rejects.toThrowError('Parsing Error')
        .catch((e) => e);
      await expect(asyncTest(`test-`, len(0)))
        .rejects.toThrowError('Parsing Error')
        .catch((e) => e);
      await expect(asyncTest(`-test`, len(0)))
        .rejects.toThrowError('Parsing Error')
        .catch((e) => e);
      await expect(asyncTest(`_test`, len(0)))
        .rejects.toThrowError('Parsing Error')
        .catch((e) => e);
      await expect(asyncTest(`test_`, len(0)))
        .rejects.toThrowError('Parsing Error')
        .catch((e) => e);
    } catch (e) {
      console.error(e);
    }
  });
});
