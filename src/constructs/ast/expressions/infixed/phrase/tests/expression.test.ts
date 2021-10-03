import { PhraseExpression } from '@constructs/ast';
import { initRuntimeWithSrc } from '@constructs/runtime/_util/initializers/runtime';
import {
  selectAllNodesFromRuntime,
  selectLastAcknowledgedNodeFromRuntime,
} from '@constructs/runtime/_util/selectors';
import { Construct } from '../../../../_abstract/construct';

describe('Phrase Expressions', () => {
  it('can be parsed', async (done) => {
    const runtime = await initRuntimeWithSrc(
      `something <something>something (something){something} something something`,
    );
    const last: Construct | undefined = selectLastAcknowledgedNodeFromRuntime(runtime);
    const all: Construct[] = selectAllNodesFromRuntime(runtime);
    expect(all.length).toEqual(24);
    expect(last?.kind).toEqual(PhraseExpression.kind);
    expect(last?.key).toEqual(
      'something <something>something(something){something} something something',
    );
    done();
  });
});
