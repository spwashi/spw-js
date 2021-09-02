import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { LocatedDomainExpression } from '../construct';
import { locatedDomainExpressionRule } from '@grammar/ast/expressions/sequence/located_domain/rule';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedDomainExpressionRule.ruleName).toEqual(LocatedDomainExpression.name);
  });
});

describe('Node Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`(location){domain}`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!LocatedDomainExpression.isLocatedDomainExpression(last)) {
      throw new Error('Expected a ' + LocatedDomainExpression.name + ' expression');
    }

    expect(last.kind).toEqual(LocatedDomainExpression.kind);
    expect(last.key).toEqual('(location){domain}');
    expect(all.length).toEqual(9);

    done();
  });
});
