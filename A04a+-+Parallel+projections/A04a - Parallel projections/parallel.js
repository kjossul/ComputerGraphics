function parallel() {
    // Build a parallel projection matrix, for a 16/9 viewport, with halfwidt w=40, near plane n=1, and far plane f=101.
    let a = 16 / 9;
    let w = 40;
    let l = -w;
    let r = w;
    let t = w / a;
    let b = -w / a;
    let n = 1;
    let f = 101;
    return [1.0 / w, 0.0, 0.0, 0.0,
        0.0, a / w, 0.0, 0.0,
        0.0, 0.0, -2 / (f - n), -(f + n) / (f - n),
        0.0, 0.0, 0.0, 1.0];
}

