import test from 'ava';
import {
  printf,
} from '../../src/printf';
import {
  customConversion,
} from '../../src/conversions';

test('interpolates %t', (t) => {
  customConversion('t', (v: any) => {
    try {
      return new Date(v).toISOString();
    } catch(error) {
      if(error instanceof RangeError) {
        return 'Invalid Date'
      }
    }
  });
  t.is(printf('%t', 0), '1970-01-01T00:00:00.000Z');
  t.is(printf('%t', '1970-01-01'), '1970-01-01T00:00:00.000Z');
  t.is(printf('%t', 'nonsense'), 'Invalid Date');
});

test('interpolates %J', (t) => {
  customConversion('J', (v: any) => {
    try {
      return JSON.stringify(v);
    } catch(error) {
      if(error instanceof TypeError) {
        return '!JSON_ERROR!';
      }
      throw error;
    }
  });
  t.is(printf('%J', 0), '0');
  t.is(printf('%J', null), 'null');
  t.is(printf('%J', { foo: 'bar' }), '{"foo":"bar"}');
  const circular = { foo: 'bar' }
  circular.circular = circular;
  t.is(printf('%J', circular), '!JSON_ERROR!');
  t.is(printf('%J', undefined), '%J');
});
