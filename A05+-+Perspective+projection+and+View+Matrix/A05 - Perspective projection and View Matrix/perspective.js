function perspective(w, h, fov) {
    // (height), and whose fov-y is passed in parameter fov. Near plane is n=0.1, and far plane f=100.
    // Build a perspective projection matrix, for a viewport whose size is determined by parameters w (width) and h
    let n = 0.1;
    let f = 100;
    let t = Math.tan(utils.degToRad(fov) / 2);
    let a = w / h;
    return [1 / (a * t), 0.0, 0.0, 0.0,
        0.0, 1 / t, 0.0, 0.0,
        0.0, 0.0, (f + n) / (n - f), 2 * f * n / (n - f),
        0.0, 0.0, -1.0, 0.0];
}

