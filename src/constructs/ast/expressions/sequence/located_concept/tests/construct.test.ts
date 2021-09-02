import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { locatedConceptExpressionRule } from '@grammar/ast/expressions/sequence/located_concept/rule';
import { LocatedConceptExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedConceptExpressionRule.ruleName).toEqual(LocatedConceptExpression.name);
  });
});

describe('LocatedConceptExpression', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(somewhere)<something>`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!LocatedConceptExpression.isLocatedConceptExpression(last)) {
      throw new Error('Expected a Node expression');
    }

    expect(last.kind).toEqual(LocatedConceptExpression.kind);
    expect(last.key).toEqual('(somewhere)<something>');
    expect(all.length).toEqual(9);

    done();
  });
});
