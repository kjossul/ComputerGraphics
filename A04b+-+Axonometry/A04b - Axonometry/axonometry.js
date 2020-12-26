function axonometry() {
    // Make an isometric view, w = 50, a = 16/9, n = 1, f = 101.
    let w = 50;
    let a = 16 / 9;
    let n = 1;
    let f = 101;
    let parallel = utils.MakeParallel(w, a, n, f);
    let Ry = utils.MakeRotateYMatrix(45);
    let Rx = utils.MakeRotateXMatrix(35.26);
    let matrices = [parallel, Rx, Ry];
    var A1 = matrices.reduce(utils.multiplyMatrices);

    // Make a dimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated 20 around the x-axis
    let alpha = 20;
    Rx = utils.MakeRotateXMatrix(alpha);
    matrices = [parallel, Rx, Ry];
    var A2 = matrices.reduce(utils.multiplyMatrices);

    // Make a trimetric view, w = 50, a = 16/9, n = 1, f = 101, rotated -30 around the x-axis and 30 around the y-axis
    alpha = -30;
    let beta = 30;
    Rx = utils.MakeRotateXMatrix(alpha);
    Ry = utils.MakeRotateYMatrix(beta);
    matrices = [parallel, Rx, Ry];
    var A3 = matrices.reduce(utils.multiplyMatrices);

    // Make an cavalier projection view, w = 50, a = 16/9, n = 1, f = 101, at 45 degrees
    alpha = utils.degToRad(45);
    let rho = 1;
    let Sz = utils.MakeShearZMatrix(-rho * Math.cos(alpha), -rho * Math.sin(alpha));
    matrices = [parallel, Sz];
    var O1 = matrices.reduce(utils.multiplyMatrices);

    // Make a cabinet projection view, w = 50, a = 16/9, n = 1, f = 101, at 60 degrees
    alpha = utils.degToRad(60);
    rho = 0.5;  // halve for cabinet
    Sz = utils.MakeShearZMatrix(-rho * Math.cos(alpha), -rho * Math.sin(alpha));
    matrices = [parallel, Sz];
    var O2 = matrices.reduce(utils.multiplyMatrices);

    return [A1, A2, A3, O1, O2];
}