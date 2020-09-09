module.exports = (min, max, t) => {
	var x = clamp(inverseLerp(min, max, t), 0, 1);
	return x * x * (3 - 2 * x);
}