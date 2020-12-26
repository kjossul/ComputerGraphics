
function view(cx, cy, cz, alpha, beta, rho) {
	// Create a view matrix for a camera in position cx, cy and cz, looking in the direction specified by
	// alpha, beta and rho, as outlined in the course slides.
	let T = utils.MakeTranslateMatrix(cx, cy, cz);
	let Ry = utils.MakeRotateYMatrix(alpha);
	let Rx = utils.MakeRotateXMatrix(beta);
	let Rz = utils.MakeRotateZMatrix(rho);
	let Mc = [T, Ry, Rx, Rz].reduce(utils.multiplyMatrices);
	return utils.invertMatrix(Mc);
}
