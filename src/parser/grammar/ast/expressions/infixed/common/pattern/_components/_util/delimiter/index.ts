import { commonDelimiter } from '@grammar/ast/nodes/atoms/operators/semantic/common_delimiter/ref';

export const delimiterComponent = {
  name: 'delimiter',
  pattern: commonDelimiter.named('delimiter'),
};
