
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
	if(/^https?:\/\/[^\/]+\/?(?:\?.*)?$/.test(url))
		return 'top page';
	var result = url.match('^https?:\/\/[^\/]+/(.+)$');
	if (result == null)
		return 'others';
	var path = result[1];
	if(/^industries\/?.*$/.test(path))
		return 'industries';
	if(/^industry\/\d+.*$/.test(path))
		return 'industry hub';
	if(/^companies\/\d+.*$/.test(path))
		return 'company profile';
	if(/^sectors\/[^\/]+\/(?:insights|updates).*$/.test(path))
		return 'updates/articles';
	if(/^sectors\/[^\/]+$/.test(path))
		return 'sector home';
	return 'others';
}

module.exports = {
	normalizeSource,
	classifyURL,
};