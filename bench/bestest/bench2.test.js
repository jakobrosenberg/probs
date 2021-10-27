import assert from 'assert'
import math from '../math.js'

test('sum', () => {
	assert.type(math.sum, 'function');
	assert.equal(math.sum(1, 2), 3);
	assert.equal(math.sum(-1, -2), -3);
	assert.equal(math.sum(-1, 1), 0);
});

test('div', () => {
	assert.type(math.div, 'function');
	assert.equal(math.div(1, 2), 0.5);
	assert.equal(math.div(-1, -2), 0.5);
	assert.equal(math.div(-1, 1), -1);
});

test('mod', () => {
	assert.type(math.mod, 'function');
	assert.equal(math.mod(1, 2), 1);
	assert.equal(math.mod(-3, -2), -1);
	assert.equal(math.mod(7, 4), 3);
});

