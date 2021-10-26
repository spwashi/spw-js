import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructMetaComponent } from '../../component';

export const nodeScopeConstructComponent = new ConstructMetaComponent({
  name:              'nodeScope',
  subjectGenerator: function* (i, c) {
    const outer = c?.parent?.nodeScope ?? null;
    if (!outer) return null;

    yield [outer, null];
    return null;
  },
  subjectEvaluators: invisibleEvaluators,
});
