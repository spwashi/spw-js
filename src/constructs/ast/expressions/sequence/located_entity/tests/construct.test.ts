import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { LocatedEntityExpression } from '../construct';
import { locatedEntityExpressionRule } from '@grammar/ast/expressions/sequence/located_entity/rule';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedEntityExpressionRule.ruleName).toEqual(LocatedEntityExpression.name);
  });
});

describe('LocatedEntityExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(somewhere) <something>someone`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!LocatedEntityExpression.isLocatedEntityExpression(last)) {
      throw new Error('Expected a Node expression');
    }

    expect(last.kind).toEqual(LocatedEntityExpression.kind);
    expect(last.key).toEqual('(somewhere)<something>someone');
    expect(all.length).toEqual(11);

    done();
  });
});
