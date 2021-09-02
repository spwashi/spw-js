import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { behaviorExpressionRule } from '@grammar/ast/expressions/sequence/behavior/rule';
import { BehaviorExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(behaviorExpressionRule.ruleName).toEqual(BehaviorExpression.name);
  });
});

describe('Behavior Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(location){domain}[essence]`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!BehaviorExpression.isBehaviorExpression(last)) {
      throw new Error('Expected a ' + BehaviorExpression.kind);
    }

    expect(last.kind).toEqual(BehaviorExpression.kind);
    expect(last.key).toEqual(`(location){domain}[essence]`);
    expect(all.length).toEqual(13);

    done();
  });
});
