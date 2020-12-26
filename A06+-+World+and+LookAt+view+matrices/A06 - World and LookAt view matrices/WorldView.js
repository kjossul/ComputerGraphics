function worldViewProjection(carx, cary, carz, cardir, camx, camy, camz) {
// Computes the world, view and projection matrices for the game.

// carx, cary and carz encodes the position of the car.
// Since the game is basically in 2D, camdir contains the rotation about the y-axis to orient the car

// The camera is placed at position camx, camy and camz. The view matrix should be computed using the
// LookAt camera matrix procedure, with the correct up-vector.

	let view = lookAtViewMatrix(carx, cary, carz, camx, camy, camz);
	let I = utils.identityMatrix();
	let T = utils.MakeTranslateMatrix(carx, cary, carz);
	let R = utils.MakeRotateYMatrix(cardir);
	let world = [I, T, R].reduce(utils.multiplyMatrices);
	return [world, view];
}

function lookAtViewMatrix(carx, cary, carz, camx, camy, camz) {
	let u = [0, 1, 0];
	let vz = utils.normalizeVector3([camx - carx, camy - cary, camz - carz]);
	let vx = utils.normalizeVector3(utils.crossVector(u, vz));
	let vy = utils.crossVector(vz, vx);  // already normalized
	let RcT = [
		vx[0], vx[1], vx[2], 0,
		vy[0], vy[1], vy[2], 0,
		vz[0], vz[1], vz[2], 0,
		0, 0, 0, 0,
	];
	let col = utils.multiplyMatrixVector(RcT, [camx, camy, camz, 0]);
	return [
		vx[0], vx[1], vx[2], -col[0],
		vy[0], vy[1], vy[2], -col[1],
		vz[0], vz[1], vz[2], -col[2],
		0, 0, 0, 1,
	];
}