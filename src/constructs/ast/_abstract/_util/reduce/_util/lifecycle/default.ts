import { ReductionLifecycleController } from '@constructs/ast/_abstract/_util/reduce/_util/lifecycle/types';

export const defaultLifecycleController: ReductionLifecycleController = ({ type }) => {
  switch (type) {
    case 'eval':
    case 'begin-reduction':
    default:
      return function* (s) {
        yield s;
      };
  }
};
