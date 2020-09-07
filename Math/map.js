/*************************************
*
*   // Map value from one range to another
*		let cur = 10;
*   let next = utils.map(cur, 0, 100, 30, 60)
*
*************************************/

module.exports = (v, a, z, b, y) => {
	return b + (y - b) * ((v - a) / (z - a))
}
