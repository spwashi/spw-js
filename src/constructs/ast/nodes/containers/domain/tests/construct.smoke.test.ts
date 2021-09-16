import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { domain } from '@grammar/ast/nodes/containers/domain/ref';
import { Domain } from '../construct';

describe('Rule Reference', () => {
  it('should exist', function () {
    expect(domain.ruleName).toEqual(Domain.name);
  });
});

describe('Domain', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`{domain}`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Domain.isDomain(last)) {
      throw new Error('Expected a ' + Domain.name + ' expression');
    }

    expect(last.kind).toEqual(Domain.kind);
    expect(last.key).toEqual('{domain}');
    expect(all.length).toEqual(4);

    done();
  });
});
