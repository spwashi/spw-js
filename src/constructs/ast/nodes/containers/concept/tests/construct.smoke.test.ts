import { initRuntime } from '@constructs/runtime/_util/initializers/runtime';
import { selectAllNodes, selectLastAcknowledgedNode } from '@constructs/runtime/_util/selectors';
import { Concept } from '../construct';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';

describe('Rule Reference', () => {
  it('should exist', function () {
    expect(concept.ruleName).toEqual(Concept.name);
  });
});

describe('Concept', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntime(`<concept>`);

    const last = selectLastAcknowledgedNode(runtime);
    const all = selectAllNodes(runtime);

    if (!Concept.isConcept(last)) {
      throw new Error('Expected a ' + Concept.name + ' expression');
    }

    expect(last.kind).toEqual(Concept.kind);
    expect(last.key).toEqual('<concept>');
    expect(all.length).toEqual(4);

    done();
  });
});
