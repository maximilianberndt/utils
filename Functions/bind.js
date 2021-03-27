export const bind = (_this, fn) => {
	for (let i = 0; i < fn.length; i++) {
		_this[fn[i]] = _this[fn[i]].bind(_this)
	}
}