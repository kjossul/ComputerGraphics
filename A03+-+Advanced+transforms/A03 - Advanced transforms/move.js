function move() {
    // Rotate 45 degrees around an arbitrary axis passing through (1,0,-1). The x-axis can be aligned to the arbitrary axis after a rotation of 30 degrees around the z-axis, and then -60 degrees around the y-axis.
    let T = utils.MakeTranslateMatrix(1, 0, -1);
    let Ry = utils.MakeRotateYMatrix(-60);
    let Rz = utils.MakeRotateZMatrix(30);
    let Rx = utils.MakeRotateXMatrix(45);
    let matrices = [T, Ry, Rz, Rx, utils.invertMatrix(Rz), utils.invertMatrix(Ry), utils.invertMatrix(T)];
    var R1 = matrices.reduce(utils.multiplyMatrices);

    // Half the size of an object, using as fixed point (5,0,-2)
    T = utils.MakeTranslateMatrix(2.5, 0, -1);
    let S = utils.MakeScaleMatrix(0.5);
    var S1 = utils.multiplyMatrices(T, S);

    // Mirror the starship along a plane passing through (1,1,1), and obtained rotating 15 degree around the x axis the xz plane
    T = utils.MakeTranslateMatrix(1, 1, 1);
    Rx = utils.MakeRotateXMatrix(15);
    S = utils.MakeScaleNuMatrix(1, -1, 1);  // mirror along xy plane
    matrices = [T, Rx, S, utils.invertMatrix(Rx), utils.invertMatrix(T)];
    var S2 = matrices.reduce(utils.multiplyMatrices);

    // Apply the inverse of the following sequence of transforms: Translation of (0, 0, 5) then rotation of 30 degree around the Y axis, and finally a uniform scaling of a factor of 3.
    T = utils.MakeTranslateMatrix(0, 0, -5);
    Ry = utils.MakeRotateYMatrix(-30);
    S = utils.MakeScaleMatrix(1 / 3);
    matrices = [T, Ry, S];
    var I1 = matrices.reduce(utils.multiplyMatrices);

    return [R1, S1, S2, I1];
}

