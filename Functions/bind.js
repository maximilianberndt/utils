module.exports = (_this, fn) => {
	let fnLength = fn.length
	for(let i = 0; i < fnLength; i++) { 
			_this[fn[i]] = _this[fn[i]].bind(_this)
	}
}  