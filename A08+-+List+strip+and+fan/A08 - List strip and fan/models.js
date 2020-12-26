function buildGeometry() {
    // Draws a cube (replace the vertices). Each row is a face
    let cube = [
        [0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [1.0, 1.0, 0.0],
        [0.0, 0.0, 1.0], [1.0, 0.0, 1.0], [0.0, 1.0, 1.0], [1.0, 1.0, 1.0]
    ];
    var vert1 = [
        cube[0], cube[1], cube[2], cube[1], cube[2], cube[3], cube[0], cube[1], cube[4], cube[1], cube[4], cube[5],
        cube[0], cube[2], cube[4], cube[2], cube[4], cube[6], cube[2], cube[3], cube[6], cube[3], cube[6], cube[7],
        cube[3], cube[7], cube[5], cube[3], cube[5], cube[1], cube[4], cube[5], cube[6], cube[5], cube[6], cube[7]
    ];

    addMesh(vert1, "L", [1.0, 0.0, 0.0]);


    // Draws a flat L-shaped pattern (replace the vertices)
    var vert2 = [cube[0], cube[1], cube[2], cube[3], cube[6], cube[7]];

    addMesh(vert2, "S", [0.0, 0.0, 1.0]);


    // Draws a flat hexagon (replace the vertices)
    let alpha = 0;
    let vert3 = [[0.0, 0.0, 0.0]];
    for (let i = 0; i < 7; i++) {
        let x = Math.cos(alpha);
        let y = Math.sin(alpha);
        vert3.push([x, y, 0.0]);
        alpha += utils.degToRad(60);
    }

    addMesh(vert3, "F", [0.0, 1.0, 0.0]);

}

