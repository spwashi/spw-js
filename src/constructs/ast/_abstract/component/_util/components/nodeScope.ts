import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructComponent } from '../../component';

export const nodeScopeConstructComponent = new ConstructComponent({
  name: 'nodeScope',
  generator: function* (i, c) {
    const outer = c?.parent?.nodeScope ?? null;
    if (!outer) return null;

    yield [outer, null];
    return null;
  },
  evaluators: invisibleEvaluators,
});
