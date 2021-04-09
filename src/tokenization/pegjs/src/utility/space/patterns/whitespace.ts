import patterns from '@spwashi/language/parsers/grammar/pattern/sub';

export const spaceTabPattern = patterns.regExp('\\t\\s ');
export const newlinePattern  = patterns.regExp('\\n,');

const _patterns =
          [
              spaceTabPattern,
              newlinePattern.named('newline'),
          ];

// language=JavaScript
const action = 'return newline';

export const optionalWhitespacePattern =
                 patterns
                     .zeroOrMore(
                         patterns.any(_patterns)
                                 .withAction(action),
                     );

export const whitespacePattern =
                 patterns
                     .oneOrMore(
                         patterns.any(_patterns)
                                 .withAction(action),
                     );