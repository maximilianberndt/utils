export const sniffBrowser = () => {
	let sUsrAg = navigator.userAgent;
	let isChrome, isSafari, isOpera, isFirefox, isMicrosoft = false

	if (sUsrAg.indexOf("Chrome") > -1) {
		isChrome = true
	} else if (sUsrAg.indexOf("Safari") > -1) {
		isSafari = true
	} else if (sUsrAg.indexOf("Opera") > -1) {
		isOpera = true
	} else if (sUsrAg.indexOf("Firefox") > -1) {
		isFirefox = true
	} else if (sUsrAg.indexOf("MSIE") > -1) {
		isMicrosoft = true
	}

	return {
		isChrome,
		isSafari,
		isOpera,
		isFirefox,
		isInternetExplorer
	}
}
