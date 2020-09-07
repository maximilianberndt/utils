module.exports = (fn, delay) => {
	let dt 
	return function() { 
			const ctx = this
			const args = arguments 
			clearTimeout(dt) 

	dt = setTimeout(() => fn.apply(ctx, args), delay) 
	} 
}  