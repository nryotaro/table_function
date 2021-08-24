
function extractDomain(url) {
	var match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im);
	return match != null ? match[1] : null;

}
function normalizeReferer(referer, hostDomain) {
	if (new RegExp("^https?:\/\/[0-9\.:\/]+$").test(referer))
		return null;
	if (referer.includes(hostDomain))
		return null;
	return extractDomain(referer);

}

function classifyURL(url) {
	var result = url.match('^https?:\/\/[^\/]+/(.+)$');
	if (result == null)
		return 'others';
	var path = result[1];
	if (new RegExp('^industry/\\d+.*$').test(path))
		return 'industry hub';
	if (new RegExp('^companies/\\d+.*$').test(path))
		return 'company profile';
	if (new RegExp('^sectors/[^\/]+$').test(path))
		return 'sector home';
	if (new RegExp('^sectors/[^\/]+/(?:insights|updates).*$').test(path))
		return 'updates/articles';

	return 'others';
}

module.exports = {
	normalizeReferer,
	classifyURL,
};