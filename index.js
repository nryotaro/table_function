
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

module.exports = {
	normalizeReferer,
};
