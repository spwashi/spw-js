import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { locatedDomainExpressionRule } from '@grammar/ast/expressions/sequence/located_domain/rule';
import { LocatedDomainExpression } from '../construct';

describe('Rule', () => {
  it('should exist', function () {
    expect(locatedDomainExpressionRule.ruleName).toEqual(LocatedDomainExpression.name);
  });
});

describe('Node Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`(location){domain}`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);
    if (!LocatedDomainExpression.isLocatedDomainExpression(last)) {
      console.log(last);
      throw new Error('Expected a ' + LocatedDomainExpression.name + ' expression');
    }

    expect(last.kind).toEqual(LocatedDomainExpression.kind);
    expect(last.key).toEqual('(location){domain}');
    expect(all.length).toEqual(9);

    done();
  });
});
