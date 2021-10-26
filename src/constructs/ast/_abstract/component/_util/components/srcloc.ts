import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';

export const srclocConstructComponent = new ConstructMetaComponent({
  name:              'srcloc',
  subjectEvaluators: invisibleEvaluators,
});
