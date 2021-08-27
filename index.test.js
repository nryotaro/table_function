sut = require('./index.js');

describe('normalizeSource', () => {

	test('If an URL does not contain alphabet characters, return null.', () => {
		var actual = sut.normalizeSource('https://52.55.155.30/', 'https://doge.com');
		expect(actual).toBe(null);
	});

	test('A referer can be insecured.', () => {
		actual = sut.normalizeSource('http://baidu.com/', 'https://doge.com');
		expect(actual).toBe('baidu.com');
	});
	test('Return null if null was passed.', () => {
		actual = sut.normalizeSource(null, 'https://googe.com');
		expect(actual).toBe(null);
	});

	test('Return the domain of an URL is not the second argument.', () => {
		var actual = sut.normalizeSource('https://t.co/foobar', 'https://foobar.com');
		expect(actual).toBe('t.co');
	});
	test('Return the domain of an URL.', () => {
		var actual = sut.normalizeSource('https://t.co/foobar', 'https://dog.bow');
		expect(actual).toBe('t.co');
	});
	test('Return the authority of an URL.', () => {
		var actual = sut.normalizeSource('https://google.co.jp/', 'https://manga.com');
		expect(actual).toBe('google.co.jp');
	});
	test("Remove 'www' from the authority of an URL.", () => {
		var actual = sut.normalizeSource('https://www.google.co.jp/', 'https://ping.com');
		expect(actual).toBe('google.co.jp');
	});
	test("If referer was null, and url contains 'utm_source,' returning the value of the 'utm_source'", () => {

		var actual = sut.normalizeSource(null, 'https://doge.com/?utm_medium=email&utm_campaign=website&utm_source=sendgrid.com');
		expect(actual).toBe('sendgrid.com');
	});
	test("If referer was null, and url does not contain 'utm_source,' returning null", () => {

		var actual = sut.normalizeSource(null, 'https://doge.com/');
		expect(actual).toBe(null);
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
