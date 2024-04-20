const {
  printf,
} = require('../../dist/src/printf.js');

module.exports = {
  name: 'local-fast-printf',
  tests: {
    with_many_string_placeholders: () => {
      return printf(
        'foo %s %s %s %s %s %s %s',
        'bar',
        'baz',
        'qux',
        'quux',
        'quuz',
        'corge',
        'grault',
      );
    },
    with_string_placeholder: () => {
      return printf('foo %s', 'bar');
    },
    without_placeholders: () => {
      return printf('foo bar baz');
    },
  },
  url: 'https://github.com/gajus/fast-printf',
};
