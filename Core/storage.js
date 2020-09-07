const browser = reqire('../Functions/sniff-browser');
const isMobile = reqire('../Functions/sniff-mobile');

module.exports = {
	browser,
	isMobile,
	width: window.innerWidth,
	height: window.innerHeight,
}