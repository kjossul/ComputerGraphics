function buildGeometry() {
    var i;

    // Draws a pyramid --- Already done, just for inspiration
    var vert1 = [[0.0, 1.0, 0.0], [1.0, -1.0, -1.0], [-1.0, -1.0, -1.0],
        [0.0, 1.0, 0.0], [1.0, -1.0, 1.0], [1.0, -1.0, -1.0],
        [0.0, 1.0, 0.0], [-1.0, -1.0, 1.0], [1.0, -1.0, 1.0],
        [0.0, 1.0, 0.0], [-1.0, -1.0, -1.0], [-1.0, -1.0, 1.0],
        [-1.0, -1.0, -1.0], [1.0, -1.0, -1.0], [1.0, -1.0, 1.0], [-1.0, -1.0, 1.0],
    ];
    var norm1 = [[0.0, 0.4472, -0.8944], [0.0, 0.4472, -0.8944], [0.0, 0.4472, -0.8944],
        [0.8944, 0.4472, 0.0], [0.8944, 0.4472, 0.0], [0.8944, 0.4472, 0.0],
        [0.0, 0.4472, 0.8944], [0.0, 0.4472, 0.8944], [0.0, 0.4472, 0.8944],
        [-0.8944, 0.4472, 0.0], [-0.8944, 0.4472, 0.0], [-0.8944, 0.4472, 0.0],
        [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0]
    ];
    var ind1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 14, 15];
    var color1 = [0.0, 0.0, 1.0];
    addMesh(vert1, norm1, ind1, color1);

    // Draws a cube -- To do for the assignment.
    let cube = [[-1.0, -1.0, 1.0], [1.0, -1.0, 1.0], [1.0, -1.0, -1.0], [-1.0, -1.0, -1.0],
        [-1.0, 1.0, 1.0], [1.0, 1.0, 1.0], [1.0, 1.0, -1.0], [-1.0, 1.0, -1.0]];
    var vert2 = [
        cube[0], cube[1], cube[5], cube[4],  // front face
        cube[1], cube[2], cube[6], cube[5],  // right face
        cube[2], cube[3], cube[7], cube[6],  // back face
        cube[3], cube[0], cube[4], cube[7],  // left face
        cube[0], cube[3], cube[2], cube[1],  // bottom face
        cube[4], cube[5], cube[6], cube[7],  // top face
    ];
    var norm2 = [
        [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0], [0.0, 0.0, 1.0],
        [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0], [1.0, 0.0, 0.0],
        [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0], [0.0, 0.0, -1.0],
        [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, 0.0, 0.0],
        [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0], [0.0, -1.0, 0.0],
        [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0], [0.0, 1.0, 0.0]
    ];
    var ind2 = [];
    for (let i = 0; i < 6 * 4; i += 4) {
        ind2.push(i, i + 1, i + 2);
        ind2.push(i, i + 2, i + 3);
    }
    var color2 = [0.0, 1.0, 1.0];
    addMesh(vert2, norm2, ind2, color2);

    // Draws a Cylinder --- Already done, just for inspiration
    ///// Creates vertices
    var vert3 = [[0.0, 1.0, 0.0]];
    var norm3 = [[0.0, 1.0, 0.0]];
    for (i = 0; i < 36; i++) {
        vert3[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 1] = [0.0, 1.0, 0.0];
        vert3[i + 37] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 37] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 0.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        vert3[i + 73] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 73] = [Math.sin(i * 10.0 / 180.0 * Math.PI), 0.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        vert3[i + 109] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
        norm3[i + 109] = [0.0, -1.0, 0.0];
    }
    vert3[145] = [0.0, -1.0, 0.0];
    norm3[145] = [0.0, -1.0, 0.0];
    ////// Creates indices
    var ind3 = [];
    //////// Upper part
    j = 0;
    for (i = 0; i < 36; i++) {
        ind3[j++] = 0;
        ind3[j++] = i + 1;
        ind3[j++] = (i + 1) % 36 + 1;
    }
    //////// Lower part
    for (i = 0; i < 36; i++) {
        ind3[j++] = 145;
        ind3[j++] = (i + 1) % 36 + 109;
        ind3[j++] = i + 109;
    }
    //////// Mid part
    for (i = 0; i < 36; i++) {
        ind3[j++] = i + 73;
        ind3[j++] = (i + 1) % 36 + 37;
        ind3[j++] = i + 37;

        ind3[j++] = (i + 1) % 36 + 37;
        ind3[j++] = i + 73;
        ind3[j++] = (i + 1) % 36 + 73;
    }
    var color3 = [1.0, 0.0, 1.0];
    addMesh(vert3, norm3, ind3, color3);


    // Draws a Cone -- To do for the assignment.
    ///// Creates vertices  (see A09)
    const n_y = Math.sin(utils.degToRad(30));
    let FACES = 72;
    let INCR = 360.0 / FACES;
    let vert4 = [];
    let norm4 = [];
    let dup = [];
    for (i = 0; i < FACES; i++) {
        vert4.push([0.0, 1.0, 0.0]);
        let v1 = [Math.sin(i * INCR / 180.0 * Math.PI), -1.0, Math.cos(i * INCR / 180.0 * Math.PI)];
        let v2 = [Math.sin((i + 1) % FACES * INCR / 180.0 * Math.PI), -1.0, Math.cos((i + 1) % FACES * INCR / 180.0 * Math.PI)];
        vert4.push(v1, v2);
        dup.push(v1);
        norm4 = norm4.concat(Array(3).fill([Math.sin(i * INCR / 180.0 * Math.PI), n_y, Math.cos(i * INCR / 180.0 * Math.PI)]));
    }
    vert4.push([0.0, -1.0, 0.0]);
    vert4 = vert4.concat(dup);  // each point in the base must be inserted again
    norm4 = norm4.concat(Array(FACES + 1).fill([0.0, -1.0, 0.0]));
    ////// Creates indices
    let ind4 = [];
    //////// side
    for (i = 0; i < FACES; i++) {
        let j = i * 3;
        ind4.push(j + 1, j, j + 2);
    }
    ////// Lower part
    let k = FACES * 3;
    for (i = 0; i < FACES; i++) {
        ind4.push(k, k + i + 1, k + (i + 1) % FACES + 1);
    }
    var color4 = [1.0, 1.0, 0.0];
    addMesh(vert4, norm4, ind4, color4);


    // Draws a Sphere --- Already done, just for inspiration
    var vert5 = [[0.0, 1.0, 0.0]];
    var norm5 = [[0.0, 1.0, 0.0]];
    const R = 5;
    ///// Creates vertices
    k = 1;
    for (j = 0; j < 18; j++) {
        for (i = 0; i < 36; i++) {
            x = R * Math.sin(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            y = R * Math.cos(j * 10.0 / 180.0 * Math.PI);
            z = R * Math.cos(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            norm5[k] = [x, y, z];
            vert5[k++] = [x, y, z];
        }
    }
    lastVert = k;
    norm5[k] = [0.0, -1.0, 0.0];
    vert5[k++] = [0.0, -1.0, 0.0];

    ////// Creates indices
    var ind5 = [];
    k = 0;
    ///////// Lateral part
    for (i = 0; i < 36; i++) {
        for (j = 1; j < 17; j++) {
            ind5[k++] = i + (j - 1) * 36 + 1;
            ind5[k++] = i + j * 36 + 1;
            ind5[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;

            ind5[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;
            ind5[k++] = i + j * 36 + 1;
            ind5[k++] = (i + 1) % 36 + j * 36 + 1;
        }
    }
    //////// Upper Cap
    for (i = 0; i < 36; i++) {
        ind5[k++] = 0;
        ind5[k++] = i + 1;
        ind5[k++] = (i + 1) % 36 + 1;
    }
    //////// Lower Cap
    for (i = 0; i < 36; i++) {
        ind5[k++] = lastVert;
        ind5[k++] = (i + 1) % 36 + 541;
        ind5[k++] = i + 541;
    }
    var color5 = [0.8, 0.8, 1.0];
    addMesh(vert5, norm5, ind5, color5);

    // Draws a Torus -- To do for the assignment
    // inner radius = 1, outer = 3
    FACES = 36;
    INCR = 360.0 / FACES;
    const ALPHA = utils.degToRad(INCR);
    let vert6 = [];
    let norm6 = [];
    ///// Creates vertices
    for (j = 0; j < FACES; j++) {  // vertical step
        let cos_y = Math.cos(j * ALPHA);
        let sin_y = Math.sin(j * ALPHA);
        let r = 2 + sin_y;
        let y = cos_y;
        for (i = 0; i < FACES; i++) {  // step of each circle
            const cos_xz = Math.cos(i * ALPHA);
            const sin_xz = Math.sin(i * ALPHA);
            let x = r * cos_xz;
            let z = r * sin_xz;
            vert6.push([x, y, z]);
            norm6.push([cos_xz * sin_y, cos_y, sin_xz * sin_y]);
        }
    }
    let ind6 = [];
    for (let j = 0; j < FACES; j++) {  // vertical step
        for (let i = 0; i < FACES; i++) {  // step of each circle
            const a = i + FACES * j;
            const b = (i + 1) % FACES + FACES * j;
            const c = i + FACES * ((j + 1) % FACES);
            const d = (i + 1) % FACES + FACES * ((j + 1) % FACES);
            ind6.push(a, b, d);
            ind6.push(a, d, c);
        }
    }
    var color6 = [1.0, 0.0, 0.0];
    addMesh(vert6, norm6, ind6, color6);
}

