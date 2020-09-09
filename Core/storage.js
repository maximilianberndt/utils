module.exports = {
	browser: require("../Functions/sniff-browser")(),
	isMobile: require("../Functions/sniff-mobile")(),
	width: window.innerWidth,
	height: window.innerHeight,
}