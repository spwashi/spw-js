import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructComponent } from '@constructs/ast/_abstract/component/component';

export const srcConstructComponent = new ConstructComponent({
  name:              'src',
  subjectEvaluators: invisibleEvaluators,
});
