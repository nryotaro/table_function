sut = require('./index.js');

describe('normalizeReferer', () => {

	test('If an URL is not secured, returning null.', () => {
		actual = sut.normalizeReferer('http://52.55.155.30/', 'foobar.com');
		expect(actual).toBe(null);
	});
	test('If the domain of an URL is the second argument, returning null.', () => {
		var actual = sut.normalizeReferer('https://hoge.com/aa', 'hoge.com');
		expect(actual).toBe(null);
	});
	test('Return the domain of an URL is not the second argument.', () => {
		var actual = sut.normalizeReferer('https://t.co/foobar', 'hoge.com');
		expect(actual).toBe('t.co');
	});
});