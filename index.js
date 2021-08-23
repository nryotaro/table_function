
function extractDomain(url) {
	var result;
	var match;
	if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
		result = match[1];
		if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
			result = match[1];
		}
	}
	return result;
}
function normalizeReferer(referer, hostDomain) {
	if (referer.startsWith('http:'))
		return null;
	if (referer.includes(hostDomain))
		return null;
	return extractDomain(referer);

}

function classifyURL(url) {
	var result = url.match('^https?:\/\/[^\/]+/(.+)$');
	if (result == null)
		return null;
	var path = result[1];
	if (new RegExp('^industry/\\d+.*$').test(path))
		return 'industry hub';
	if (new RegExp('^companies/\\d+.*$').test(path))
		return 'company profile';
	if (new RegExp('^sectors/[^\/]+$').test(path))
		return 'sector home';
	if (new RegExp('^sectors/[^\/]+/(?:insights|updates).*$').test(path))
		return 'updates/articles';
}

module.exports = {
	normalizeReferer,
	classifyURL,
};