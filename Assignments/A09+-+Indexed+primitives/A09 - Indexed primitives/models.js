function buildGeometry() {
    var i;

    // Draws a Cone --- Already done, just for inspiration
    ///// Creates vertices
    var vert1 = [[0.0, 1.0, 0.0]];
    for (i = 0; i < 36; i++) {
        vert1[i + 1] = [Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)];
    }
    vert1[37] = [0.0, -1.0, 0.0];
    ////// Creates indices
    var ind1 = [];
    //////// Upper part
    j = 0;
    for (i = 0; i < 36; i++) {
        ind1[j++] = 0;
        ind1[j++] = i + 1;
        ind1[j++] = (i + 1) % 36 + 1;
    }
    //////// Lower part
    for (i = 0; i < 36; i++) {
        ind1[j++] = 37;
        ind1[j++] = (i + 1) % 36 + 1;
        ind1[j++] = i + 1;
    }

    var color1 = [1.0, 0.0, 0.0];
    addMesh(vert1, ind1, color1);


    // Draws a Cylinder -- To do for the assignment.
    let vert2 = [];
    // upper
    vert2.push([0.0, 1.0, 0.0]);
    for (i = 0; i < 36; i++) {
        vert2.push([Math.sin(i * 10.0 / 180.0 * Math.PI), 1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)]);
    }
    // lower
    vert2.push([0.0, -1.0, 0.0]);
    for (i = 0; i < 36; i++) {
        vert2.push([Math.sin(i * 10.0 / 180.0 * Math.PI), -1.0, Math.cos(i * 10.0 / 180.0 * Math.PI)]);
    }
    let ind2 = [];
    // upper base
    for (let i = 1; i <= 36; i++) {
        ind2.push(0, i, i % 36 + 1);
    }
    // lower base
    for (let i = 1; i <= 36; i++) {
        ind2.push(37, i % 36 + 38, i + 37);
    }
    // side
    for (let i = 1; i <= 36; i++) {
        ind2.push(i + 37, i % 36 + 38, i % 36 + 1);  // vertex on upper base
        ind2.push(i % 36 + 1, i, i + 37);  // vertex on bottom base
    }
    var color2 = [0.0, 0.0, 1.0];
    addMesh(vert2, ind2, color2);


    // Draws a Sphere --- Already done, just for inspiration
    var vert3 = [[0.0, 1.0, 0.0]];
    ///// Creates vertices
    k = 1;
    for (j = 1; j < 18; j++) {  // vertical step
        for (i = 0; i < 36; i++) {  // step of each circle
            x = Math.sin(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            y = Math.cos(j * 10.0 / 180.0 * Math.PI);
            z = Math.cos(i * 10.0 / 180.0 * Math.PI) * Math.sin(j * 10.0 / 180.0 * Math.PI);
            vert3[k++] = [x, y, z];
        }
    }
    vert3[k++] = [0.0, -1.0, 0.0];

    ////// Creates indices
    var ind3 = [];
    k = 0;
    ///////// Lateral part
    for (i = 0; i < 36; i++) {
        for (j = 1; j < 17; j++) {
            ind3[k++] = i + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;

            ind3[k++] = (i + 1) % 36 + (j - 1) * 36 + 1;
            ind3[k++] = i + j * 36 + 1;
            ind3[k++] = (i + 1) % 36 + j * 36 + 1;
        }
    }
    //////// Upper Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 0;
        ind3[k++] = i + 1;
        ind3[k++] = (i + 1) % 36 + 1;
    }
    //////// Lower Cap
    for (i = 0; i < 36; i++) {
        ind3[k++] = 577;
        ind3[k++] = (i + 1) % 36 + 540;
        ind3[k++] = i + 540;
    }

    var color3 = [0.0, 1.0, 0.0];
    addMesh(vert3, ind3, color3);


    // Draws a Torus -- To do for the assignment
    // inner radius = 1, outer = 3
    var vert4 = [];
    ///// Creates vertices
    for (j = 0; j < 36; j++) {  // vertical step
        let r = 2 + Math.sin(j * 10.0 / 180.0 * Math.PI);
        let y = Math.cos(j * 10.0 / 180.0 * Math.PI);
        for (i = 0; i < 36; i++) {  // step of each circle
            let x = r * Math.cos(i * 10.0 / 180.0 * Math.PI);
            let z = r * Math.sin(i * 10.0 / 180.0 * Math.PI);
            vert4.push([x, y, z]);
        }
    }
    var ind4 = [];
    for (let j = 0; j < 36; j++) {  // vertical step
        for (let i = 0; i < 36; i++) {  // step of each circle
            const a = i + 36 * j;
            const b = (i + 1) % 36 + 36 * j;
            const c = i + 36 * ((j + 1) % 36);
            const d = (i + 1) % 36 + 36 * ((j + 1) % 36);
            ind4.push(a, b, c);
            ind4.push(c, b, d);
        }
    }
    var color4 = [1.0, 1.0, 0.0];
    addMesh(vert4, ind4, color4);
}

