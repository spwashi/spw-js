import { ComponentEvaluatorObject } from '@constructs/ast/_abstract/_types/componentDescription';

export const invisibleEvaluators: ComponentEvaluatorObject = {
  stringify: (): string => '',
};
