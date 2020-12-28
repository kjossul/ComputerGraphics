function draw() {
	// line(x1,y1, x2,y2)
	// draws a line from a point at Normalized screen coordinates x1,y1 to Normalized screen coordinates x2,y2
	let points = [[-0.5, -0.3], [0.5, -0.3], [0.5, 0], [0.3, 0.1], [0.3, 0.3], [-0.2, 0.3], [-0.2, 0.1], [-0.5, 0], [-0.5, -0.3]];
	for (let i = 0; i < points.length - 1; i++) {
		line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
	}
}

function draw2() {
	draw_circle(0, 0, 0.8, 0, 2 * 3.14);
	draw_circle(0, 0.4, 0.1, 0, 2 * 3.14);
	draw_circle(0, -0.4, 0.1, 0, 2 * 3.14);
	draw_circle(0, 0.4, 0.4, -3.14 / 2, 3.14 / 2);
	draw_circle(0, -0.4, 0.4, 3.14 / 2, 3.14 / 2 * 3);
}

/**
* Draws a circle with the given center and radius starting from angle a to angle b
* */
function draw_circle(xc, yc, r, a, b) {
	const SIDES = 128;
	const ALPHA = (b - a) / SIDES;  // angle step
	let x = xc + r * Math.cos(a);
	let y = yc + r * Math.sin(a);
	for(let i = 1; i <= SIDES; i++) {
		let x1 = xc + r * Math.cos(a + i * ALPHA);
		let y1 = yc + r * Math.sin(a + i * ALPHA);
		line(x, y, x1, y1);
		x = x1;
		y = y1;
	}
}