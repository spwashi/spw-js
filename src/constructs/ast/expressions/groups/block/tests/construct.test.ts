import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodesFromRuntime } from '@constructs/runtime/_util/selectors';
import { BlockExpression } from '../construct';

describe('BlockExpression', () => {
  it('Simple; Exact', async (done) => {
    const runtime = await initRuntimeWithSrc(`something; something else;`);
    const all = selectAllNodesFromRuntime(runtime);
    const blocks = all.filter((last) => BlockExpression.isBlockExpression(last));
    const firstBlock = blocks[0];
    if (!blocks.length) {
      throw new Error('Expected a ' + BlockExpression.name);
    }

    expect(firstBlock?.kind).toEqual(BlockExpression.kind);
    expect(firstBlock?.key).toEqual('something; something else;');
    expect(all.length).toEqual(5);

    done();
  });

  it('Simple; No trailing semicolon', async (done) => {
    const runtime = await initRuntimeWithSrc(`something; something + else`);
    const all = selectAllNodesFromRuntime(runtime);
    const blocks = all.filter((last) => BlockExpression.isBlockExpression(last));
    const firstBlock = blocks[0];
    if (!blocks.length) {
      throw new Error('Expected a ' + BlockExpression.name);
    }

    expect(firstBlock?.kind).toEqual(BlockExpression.kind);
    expect(firstBlock?.key).toEqual('something; something+else;');
    expect(all.length).toEqual(7);

    done();
  });
});
