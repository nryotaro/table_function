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

describe('classifyRequest', () => {

	test("If the path starts with 'industry,' and the second part of the path is an integer, classify it into 'industry hub.'", () => {
		var actual = sut.classifyURL('https://doge.com/industry/3');
		expect(actual).toBe('industry hub');
	});

	test("If the path starts with 'companies,' and the second part of the path is an integer, classify it into 'company profile.'", () => {
		var actual = sut.classifyURL('https://doge.com/companies/3');
		expect(actual).toBe('company profile');
	});

	test("If the path is in the format of '/companies/3?utm_source=doge', classify it into 'company profile.'", () => {
		var actual = sut.classifyURL('https://doge.com/companies/3');
		expect(actual).toBe('company profile');
	});

	test("If the path is in the format of '/sectors/<sector name>', classify it into 'sector home.'", () => {
		var actual = sut.classifyURL('https://doge.com/sectors/pet');
		expect(actual).toBe('sector home');
	});
	test("If the path is in the format of '/sectors/<sector name>?utm_source=doge', classify it into 'sector home.'", () => {
		var actual = sut.classifyURL('https://doge.com/sectors/pet?utm_source=doge');
		expect(actual).toBe('sector home');
	});
	test("If the path is in the format of '/sectors/<sector name>/insights', classify it into 'updates/articles.'", () => {
		var actual = sut.classifyURL('https://doge.com/sectors/healthcare/insights');
		expect(actual).toBe('updates/articles');
	});
	test("If the path is in the format of '/sectors/<sector name>/updates/<id>', classify it into 'updates/articles.'", () => {
		var actual = sut.classifyURL('https://doge.com/sectors/healthcare/updates/32');
		expect(actual).toBe('updates/articles');
	});
	test("If the path is in the format of '/sectors/<sector name>/updates/<id>?<query parameters>', classify it into 'updates/articles.'", () => {
		var actual = sut.classifyURL('https://doge.com/sectors/healthcare/updates/32?utm_source=twitter');
		expect(actual).toBe('updates/articles');
	});
});
