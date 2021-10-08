import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';

export const srclocConstructComponent = new ConstructComponent({
  name:              'srcloc',
  subjectEvaluators: invisibleEvaluators,
});
