// these global variables are used to contain the current angles of the world
// HERE YOU WILL HAVE TO ADD ONE OR MORE GLOBAL VARIABLES TO CONTAIN THE ORIENTATION
// OF THE OBJECT
let q = new Quaternion();
// this function returns the world matrix with the updated rotations.
// parameters rvx, rvy and rvz contains a value in the -1 .. +1 range that tells the angular velocity of the world.
function updateWorld(rvx, rvy, rvz) {
	let q1 = new Quaternion(1, utils.degToRad(rvx), utils.degToRad(rvy), utils.degToRad(rvz));
	// compute the rotation matrix
	q = q1.mul(q);
	return q.toMatrix4();
}

