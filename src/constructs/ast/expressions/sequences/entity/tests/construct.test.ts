import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import { getSalientNode } from '@constructs/runtime/_util/initializers/runtime/initRuntimeWithSrc';
import { selectAllNodesFromRuntime } from '@constructs/runtime/_util/selectors';
import { EntityExpression } from '../construct';

describe('EntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`<conceptual_identifier>name`);
    const last = getSalientNode(`<conceptual_identifier>name`);
    const all = selectAllNodesFromRuntime(runtime);

    if (!EntityExpression.isEntityExpression(last)) {
      throw new Error(
        `Expected a ${EntityExpression.name}. Received a ${
          last?.kind ?? JSON.stringify(last, null, 3)
        }`,
      );
    }

    expect(last?.kind).toEqual(EntityExpression.kind);
    expect(last?.key).toEqual('<conceptual_identifier>name');
    expect(all.length).toEqual(7);

    done();
  });
});
