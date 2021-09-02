import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { LocatedEssenceExpression } from '../construct';
import { locatedEssenceExpressionRule } from '@grammar/ast/expressions/sequence/located_essence/rule';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedEssenceExpressionRule.ruleName).toEqual(LocatedEssenceExpression.name);
  });
});

describe('Located Essence Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(location)[essence]`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!LocatedEssenceExpression.isLocatedEssenceExpression(last)) {
      throw new Error('Expected a ' + LocatedEssenceExpression.kind);
    }

    expect(last.kind).toEqual(LocatedEssenceExpression.kind);
    expect(last.key).toEqual(`(location)[essence]`);
    expect(all.length).toEqual(9);

    done();
  });
});
