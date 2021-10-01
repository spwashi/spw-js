import { blockDelimiter } from '@grammar/ast/nodes/atoms/operators/delimiters/block_delimiter/ref';

export const delimiterComponent = {
  name: 'delimiter',
  pattern: blockDelimiter.named('delimiter'),
};
