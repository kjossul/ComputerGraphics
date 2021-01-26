function axonometry() {
	let a = 16 / 9;
	let w = 50;
	let n = 1;
	let f = 101;
	let P = [1.0 / w, 0.0, 0.0, 0.0,
		0.0, a / w, 0.0, 0.0,
		0.0, 0.0, -2 / (f - n), -(f + n) / (f - n),
		0.0, 0.0, 0.0, 1.0];
	// Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
	var A1 =  [P, utils.MakeRotateXMatrix(35.26), utils.MakeRotateYMatrix(45)].reduce(utils.multiplyMatrices);
			   
	// Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
	var A2 =  [P, utils.MakeRotateXMatrix(20), utils.MakeRotateYMatrix(45)].reduce(utils.multiplyMatrices);
			   
	// Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
	var A3 =  [P, utils.MakeRotateXMatrix(-30), utils.MakeRotateYMatrix(30)].reduce(utils.multiplyMatrices);
			   
	// Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
	var O1 =  [P, utils.MakeShearZMatrix(-Math.cos(utils.degToRad(45)), -Math.sin(utils.degToRad(45)))].reduce(utils.multiplyMatrices);
	// Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
	var O2 =  [P, utils.MakeShearZMatrix(-0.5 * Math.cos(utils.degToRad(60)), -0.5 *Math.sin(utils.degToRad(60)))].reduce(utils.multiplyMatrices);
	return [A1, A2, A3, O1, O2];
}