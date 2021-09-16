import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { concept } from '@grammar/ast/nodes/containers/concept/ref';
import { Concept } from '../construct';

describe('Rule Reference', () => {
  it('should exist', function () {
    expect(concept.ruleName).toEqual(Concept.name);
  });
});

describe('Concept', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(`<concept>`);

    const last = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all = selectAllNodesFromRuntime(runtime);

    if (!Concept.isConcept(last)) {
      throw new Error('Expected a ' + Concept.name + ' expression');
    }

    expect(last.kind).toEqual(Concept.kind);
    expect(last.key).toEqual('<concept>');
    expect(all.length).toEqual(4);

    done();
  });
});
