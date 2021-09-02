import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { entityExpressionRule } from '@grammar/ast/expressions/sequence/entity/rule';
import { EntityExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(entityExpressionRule.ruleName).toEqual(EntityExpression.name);
  });
});

describe('EntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`<something>something`);
    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!EntityExpression.isEntityExpression(last)) {
      throw new Error('Expected a Node expression');
    }

    expect(last?.kind).toEqual(EntityExpression.kind);
    expect(last?.key).toEqual('<something>something');
    expect(all.length).toEqual(6);

    done();
  });
});
