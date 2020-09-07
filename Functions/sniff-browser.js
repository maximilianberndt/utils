module.exports = function () {
	let sBrowser, sUsrAg = navigator.userAgent;

	if (sUsrAg.indexOf("Chrome") > -1) {
		sBrowser = "isChrome"
	} else if (sUsrAg.indexOf("Safari") > -1) {
		sBrowser = "isSafari"
	} else if (sUsrAg.indexOf("Opera") > -1) {
		sBrowser = "isOpera"
	} else if (sUsrAg.indexOf("Firefox") > -1) {
		sBrowser = "isFirefox"
	} else if (sUsrAg.indexOf("MSIE") > -1) {
		sBrowser = "isMicrosoft"
	}

	return sBrowser
}
