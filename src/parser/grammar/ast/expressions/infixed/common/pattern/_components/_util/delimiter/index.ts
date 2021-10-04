import { commonDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/common_delimiter/ref';

export const delimiterComponent = {
  name: 'delimiter',
  pattern: commonDelimiter.named('delimiter'),
};
