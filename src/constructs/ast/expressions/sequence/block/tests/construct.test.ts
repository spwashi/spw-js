import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodesFromRuntime } from '@constructs/runtime/_util/selectors';
import { blockExpressionRule } from '@grammar/ast/expressions/sequence/block/rule';
import { Block } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(blockExpressionRule.ruleName).toEqual(Block.name);
  });
});

describe('BlockExpression', () => {
  it('Simple; Exact', async (done) => {
    const runtime = await initRuntimeWithSrc(`something; something else;`);
    const all = selectAllNodesFromRuntime(runtime);
    const blocks = all.filter((last) => Block.isBlockExpression(last));
    const firstBlock = blocks[0];
    if (!blocks.length) {
      throw new Error('Expected a ' + Block.name);
    }

    expect(firstBlock?.kind).toEqual(Block.kind);
    expect(firstBlock?.key).toEqual('something; something else;');
    expect(all.length).toEqual(5);

    done();
  });

  it('Simple; No trailing semicolon', async (done) => {
    const runtime = await initRuntimeWithSrc(`something; something + else`);
    const all = selectAllNodesFromRuntime(runtime);
    const blocks = all.filter((last) => Block.isBlockExpression(last));
    const firstBlock = blocks[0];
    if (!blocks.length) {
      throw new Error('Expected a ' + Block.name);
    }

    expect(firstBlock?.kind).toEqual(Block.kind);
    expect(firstBlock?.key).toEqual('something; something+else;');
    expect(all.length).toEqual(7);

    done();
  });
});
