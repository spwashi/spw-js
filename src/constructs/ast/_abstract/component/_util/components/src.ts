import { invisibleEvaluators } from '@constructs/ast/_abstract/component/_util/evaluators/invisible';
import { ConstructMetaComponent } from '@constructs/ast/_abstract/component/component';

export const srcConstructComponent = new ConstructMetaComponent({
  name:              'src',
  subjectEvaluators: invisibleEvaluators,
});
