
function normalizeReferer(referer) {
	if (referer == null)
		return null;
	if (new RegExp("^https?:\/\/[0-9\.:\/]+$").test(referer))
		return null;
	var match = referer.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im);
	return match != null ? match[1] : null;
}

function extract_utm_source(url) {
	var match = url.match(/utm_source=([^&]+)/);
	if (match != null)
		return match[1];
	return null;
}

function normalizeSource(referer, url) {
	var normalizedReferer = normalizeReferer(referer);
	if(normalizedReferer != null)
		return normalizedReferer;
	return extract_utm_source(url);
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
	normalizeSource,
	classifyURL,
};