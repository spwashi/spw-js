import { AnchorNode } from '@constructs/ast';
import {
  getAllNodes,
  getSalientNode,
} from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';

describe('AnchorNodes', () => {
  it('Can start with an character of the alphabet and consist of alphanumeric characters, underscores, and dashes', async () => {
    try {
      const src = 'step';
      const all = getAllNodes(src);
      const last = getSalientNode(src);
      expect(AnchorNode.isAnchorNode(last)).toBeTruthy();
      expect(all.length).toEqual(1);
    } catch (e) {
      throw new Error('Parsing Error');
    }
  });

  it('Must start with an alphabetic character and must end with an alphanumeric character', async () => {
    const asyncTest = async (src: string, check: (src: string) => void) => {
      try {
        check(src);
      } catch (e) {
        throw new Error('Parsing Error');
      }
    };
    const len = (l: number) => (src: string) => {
      const cache = {};
      const all = getAllNodes(src, cache);
      const last = getSalientNode(src, cache);
      expect(last?.kind).toEqual('anchor');
      expect(last?.key).toEqual(src);
      expect(all.length).toEqual(l);
    };
    try {
      await expect(asyncTest(`test`, len(1))).resolves;
      await expect(asyncTest(`test222`, len(1))).resolves;
      await expect(asyncTest(`test`, len(1))).resolves;
      await expect(asyncTest(`_test`, len(1))).resolves;
      await expect(asyncTest(`2test`, len(0))).rejects.toThrowError('Parsing Error');
      await expect(asyncTest(`test_`, len(0))).rejects.toThrowError('Parsing Error');
    } catch (e) {
      console.error(e);
    }
  });
});
