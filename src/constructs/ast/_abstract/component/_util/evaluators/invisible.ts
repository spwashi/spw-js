import { ComponentSubjectEvaluatorObject } from '@constructs/ast/_abstract/_types/componentDescription';

export const invisibleEvaluators: ComponentSubjectEvaluatorObject = {
  stringify: (): string => '',
};
